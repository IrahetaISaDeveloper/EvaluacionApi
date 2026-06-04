import express from "express"
import recoveryTeacher from "../controller/recoveryTeacherController.js"

const router = express.Router();

router
.route("/requestCode")
.post(recoveryTeacher.requestCode)

router
.route("/verifyCode")
.post(recoveryTeacher.verifyCode)

router
.route("/newPassword")
.post(recoveryTeacher.newPassword)

export default router;