import subjectModels from "../models/subjects.js";

export const getSubject = async (req, res) => {
  const subject = await subjectModels.find();
  res.json(subject);
};

export const insertSubject = async (req, res) => {
  const { subjectName, teacher_id, isAvailable } = req.body;
  const newSubject = new subjectModels({
    subjectName,
    teacher_id,
    isAvailable,
  });
  await newSubject.save();
  res.json({ message: "Subject saved" });
};

export const subjectUpdate = async (req, res) => {
  const { subjectName, teacher_id, isAvailable } = req.body;
  await subjectModels.findByIdAndUpdate(
    req.params.id,
    {
      subjectName,
      teacher_id,
      isAvailable,
    },
    { new: true },
  );
  res.json({ message: "Subject updated" });
};

export const subjectDelete = async (req, res) => {
  await subjectModels.findByIdAndDelete(req.params.id);
  res.json({ message: "Subject deleted" });
};
