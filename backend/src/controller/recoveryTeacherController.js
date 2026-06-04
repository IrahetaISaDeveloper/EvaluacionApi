import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"
import crypto, {verify} from "crypto"
import nodeMailer from "nodemailer"

import { config } from "../../config"

import teacherModel from "../models/teachers.js"


const recoveryTeacherController = {};

recoveryTeacherController.requestCode = async (req, res) => {
    try {
        const {email} = req.body;
        const userFound = await teacherModel.findOne({email})
        if(!userFound){
            return res.status(400).json ({message:"User not found "})
        }
        const randomCode = crypto.randomBytes(3).toString("hex")
        const token = jsonwebtoken.sign(
            {email, randomCode, userType:"Teacher", verified: false},
            config.JWT.Secret,
            {expiresIn:"15"}
        )
        res.cookie("recoveryCookie", token, {maxAge: 15*60*1000})

        const transporter = nodeMailer.createTransport({
            service:"gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions={
            from: config.email.user_email,
            to: email,
            subject: "Codigo de recuperación de contraseña",
            text:"El codigo vence en 15 minutos " + randomCode
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                return res.status(500).json({message:"Error al enviar el correo"})
            }
        })
        return res.status(200).json({message: "email sent"})
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message:"Internal server error"})
    };

    recoveryTeacherController.verifyCode = async (req, res) => {
        try {
            const {code} = req.body;
            const token = req.cookies.recoveryCookie;
            const decoded = jsonwebtoken.verifytoken.verify(token, config.JWT.Secret)
            
            if(code !== decoded.randomCode){
                return res.status(400).json({message:"Invalid code"})
            }
            const newToken = jsonwebtoken.sign(
                {email: decoded.email, userType: "Teacher", verified: true},
                config.JWT.Secret,
                {expiresIn:"15m"}
            )

            res.cookie(recoveryCookie, newToken, {maxAge:15*60*1000})
            return res.status(200).json({message:"Code verified succesfully"})

        } catch (error) {
            console.log("error " + error)
            return res.status(500).json({message:"Internal server error"})
        }
    }

    recoveryTeacherController.newPassword = async (req, res) =>{
        try {
            const {newPassword, confirmNewPassword}= req.body
            if(newPassword !== confirmNewPassword){
                return res.status(400).json({message:"password doesn´t match"})
            }

            const token = req.cookies.recoveryCookie;
            const decoded = jsonwebtoken.verify(token, config.JWT.Secret)
            if(!decoded.verified){
                return res.status(400).json({message: "code not verified"})
            }

            const passwordHash = await bcrypt.hash(newPassword, 10)
            await teacherModel.findOneAndUpdate(
                {email: decoded.email},
                {password: passwordHash},
                {new: true}
            )
            res.cookie("recoveryCookie")
            return res.status(200).json({message:"password update"})
        } catch (error) {
            console.log("error " + error)
            return res.status(500).json({message:"Internal server error"})
        }
    }
}

    export default recoveryTeacherController;
