import teachersModel from "../models/teachers.js"

export const getTeachers = async(req, res) =>{
    const teachers = await teachersModel.find()
    res.json(teachers)
}

export const teachersUpdate = async(req, res) =>{
    const {name, lastname,email, password, phone, hiredate} = req.body;
    await teachersModelModels.findByIdAndUpdate(req.params.id,{
        name, lastname,email, password, phone, hiredate
    }, {new: true})
    res.json({message: "Teacher updated"})
}

export const teacherDelete = async(req,res) =>{
    await teachersModelModels.findByIdAndDelete(req.params.id);
    res.json({message: "teacher deleted"})
}