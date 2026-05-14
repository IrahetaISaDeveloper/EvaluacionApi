import { Schema, model } from "mongoose";

const subjectSchema = new Schema(
  {
    name: {
      type: String,
    },
    teacher_id: {
      type: mongoose.Types.ObjectId,
      ref: "Teachers",
    },
    isAvailable: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("subjects", subjectSchema);
