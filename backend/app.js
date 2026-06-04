import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import logout from "./src/routes/logout.js"
import registerStudent from "./src/routes/registerStudent.js"
import registerTeacher from "./src/routes/registerTeacher.js"
import recoveryTeacher from "./src/routes/recoveryTeacher.js"
import recoveryStudent from "./src/routes/recoveryStudent.js"
import students from "./src/routes/student.js"
import teachers from "./src/routes/teacher.js"
import subject from "./src/routes/subject.js"
import especiality from "./src/routes/especiality.js"
import enrollment from "./src/routes/enrollment.js"

const app = express()

app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials:true
}))

app.use(cookieParser())

app.use(express.json())
//students
app.use("/api/registerStudent", registerStudent)
app.use("/api/recoveryStudentPassword", recoveryStudent)
app.use("/api/students", students)
//teachers
app.use("/api/registerTeacher", registerTeacher)
app.use("/api/recoveryPasswordTeacher", recoveryTeacher)
app.use("/api/teachers", teachers)

app.use("/api/logout", logout)
//subject
app.use("/api/subject", subject)
//especiality
app.use("/api/especiality", especiality)
//enrollments
app.use("/api/enrollments", enrollment)

export default app