import enrollmentModels from "../models/enrollment.js"

export const getEnrollment = async(req, res) =>{
    const enrollment = await enrollmentModels.find()
    res.json(enrollment)
}

export const insertEnrollment = async (req, res) => {
    const {student_id,amount, paymentDate, method, status, referenceNumber } = req.body;
    const newEnrollment = new enrollmentModels({student_id,amount, paymentDate, method, status, referenceNumber})
    await newEnrollment.save()
    res.json({message: "Enrollment saved"})
}

export const enrollmentUpdate = async(req, res) =>{
    const {student_id,amount, paymentDate, method, status, referenceNumber} = req.body;
    await enrollmentModels.findByIdAndUpdate(req.params.id,{
        student_id,amount, paymentDate, method, status, referenceNumber
    }, {new: true})
    res.json({message: "Enrollment updated"})
}

export const enrollmentDelete = async(req,res) =>{
    await enrollmentModels.findByIdAndDelete(req.params.id);
    res.json({message: "Enrollment deleted"})
}