import specialityModels from "../models/especiality.js"

export const getSpeciality = async(req, res) =>{
    const specility = await specialityModels.find()
    res.json(specility)
}

export const insertEspeciality = async (req, res) => {
    const {specialityName, isAvailable } = req.body;
    const newEspeciality = new specialityModels({specialityName, isAvailable})
    await newEspeciality.save()
    res.json({message: "Especiality saved"})
}

export const especialityUpdate = async(req, res) =>{
    const {specialityName, isAvailable} = req.body;
    await specialityModels.findByIdAndUpdate(req.params.id,{
        specialityName, isAvailable
    }, {new: true})
    res.json({message: "Especiality updated"})
}

export const especialityDelete = async(req,res) =>{
    await specialityModels.findByIdAndDelete(req.params.id);
    res.json({message: "Especiality deleted"})
}