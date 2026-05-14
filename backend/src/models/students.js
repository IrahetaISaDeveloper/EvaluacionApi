import { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    birthdate: {
      type: Date,
    },
    speciality_id: {
      type: mongoose.Types.ObjectId,
      ref: "especiality",
    },
    carnet: {
      type: String,
    },
    phone: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    timeOut: {
      type: Date,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("Students", studentSchema);
