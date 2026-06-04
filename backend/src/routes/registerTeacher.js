import express from "express"
import registerTeacher from "../controller/registerTeacher.js"

const router = express.Router();

router
.route("/")
.post(registerTeacher.register)

router
.route("/verifyCodeEmail")
.post(registerTeacher.verifyCode)

export default router;