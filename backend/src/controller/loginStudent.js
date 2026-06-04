import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import studentModel from "../models/students.js"
import {config} from "../../config.js"

loginStudent.Login = async(req , res) => {
    try{
        const {email,password} = req.body
        const userFound = await studentModel.findOne({email})
        if(!userFound){
            return res.status(404).json({message:"Student not found"})
        }
        if(userFound.timeOut && userFound.timeOut > Date.now()){
            return res.status(403).json({message:"account blocked, too much failed tries"})
        }
        const isMatch = await bcrypt.compare(password,userFound.password)
        if(!isMatch){
            userFound.loginAttempts = (userFound.loginAttempts|| 0)+1
            if(userFound.loginAttempts >= 5){
                userFound.timeOut = Date.now()+ 15 * 60 * 1000;
                await userFound.save();
                return res.status(403).json({message:"account blocked"})
            }
            await userFound.save();
            return res.status(403).json({message:"Incorrect password"})
        }

        userFound.loginAttempts = 0;
        userFound.timeOut= null;
        await userFound.save()

        const token = jsonwebtoken.sign(
            {id: userFound.id, userType:"Student"},
            config.JWT.Secret,
            {expiresIn:"30d"}
        )

        res.cookie("authCookie", token);
        return res.status(200).json({message: "Login successfully"})
    }catch(error){
        console.log("error " + error)
        return res.status(500).json({message:"internal server error"})
    }
};