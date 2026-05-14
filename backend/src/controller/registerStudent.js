import nodemailer from "nodemailer"; 
import crypto from "crypto"; 
import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs"; 
 
import studentModel from "../models/students.js";
 
import { config } from "../../config.js";
 
const registerStudent = {};
 
registerStudent.register = async (req, res) => {
  const {
    name,
    lastName,
    birthdate,
    email,
    password,
    speciality_id,
    carnet,
    phone,
    isVerified,
    loginAttempts,
    timeOut,
  } = req.body;
 
  try {
    const existStudent = await studentModel.findOne({ email });
    if (existStudent) {
      return res.status(400).json({ message: "Student already exist" });
    }
 
    const passwordHash = await bcryptjs.hash(password, 10);
 
    const verificationCode = crypto.randomBytes(3).toString("hex");
 
    const tokenCode = jsonwebtoken.sign(
      {
        email,
        verificationCode,
        name,
        lastName,
        birthdate,
        passwordHash,
        speciality_id,
        carnet,
        phone,
        isVerified,
        loginAttempts,
        timeOut,
      },
      config.JWT.secret,
      { expiresIn: "15m" },
    );
 
    res.cookie("verificationToken", tokenCode, { maxAge: 15 * 60 * 1000 });
 
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });
 
    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Verificación de cuenta",
      text:
        "Para verificar tu cuenta, utiliza este código" +
        verificationCode +
        "expira en 15 minutos",
    };
 
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "error" });
      }
      res
        .status(200)
        .json({ message: "Student registered, verify your email" });
    });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};
 
registerStudent.verifyCode = async (req, res) => {
  try {
    const { verificationCodeRequest } = req.body;
 
    const token = req.cookies.verificationToken;
 
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const {
      email,
      verificationCode: storedCode,
      name,
      lastName,
      birthdate,
      passwordHash,
      speciality_id,
      carnet,
      phone,
      isVerified,
      loginAttempts,
      timeOut,
    } = decoded;
 
    if (verificationCodeRequest !== storedCode) {
      return res.status(400).json({ message: "Invalid code" });
    }
 
    const newStudent = new studentModel({
      name,
      lastName,
      birthdate,
      email,
      password: passwordHash,
      speciality_id,
      carnet,
      phone,
      isVerified: true,
      loginAttempts,
      timeOut,
    });
 

    await newStudent.save();
 
    const student = await studentModel.findOne({ email });
    student.isVerified = true;
    await student.save();
    //
    res.clearCookie("verificationToken");
 
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
 
export default registerStudent;
 