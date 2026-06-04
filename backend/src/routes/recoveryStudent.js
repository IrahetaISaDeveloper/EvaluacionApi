import express from "express"
import recoveryStudent from "../controller/recoveryPasswordController.js"

const router = express.Router();

router
.route("/requestCode")
.post(recoveryStudent.requestCode)

router
.route("/verifyCode")
.post(recoveryStudent.verifyCode)

router
.route("/newPassword")
.post(recoveryStudent.newPassword)

export default router;