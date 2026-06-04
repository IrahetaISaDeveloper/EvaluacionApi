import studentModels from "../models/students.js"

export const getStudent = async(req, res) =>{
    const student = await studentModels.find()
    res.json(student)
}

export const studentUpdate = async(req, res) =>{
    const {name, lastname,email, password, birthdate, especiality_id, carnet, phone} = req.body;
    await studentModels.findByIdAndUpdate(req.params.id,{
        name, lastname,email, password, birthdate, especiality_id, carnet, phone
    }, {new: true})
    res.json({message: "Student updated"})
}

export const studentDelete = async(req,res) =>{
    await studentModels.findByIdAndDelete(req.params.id);
    res.json({message: "student deleted"})
}