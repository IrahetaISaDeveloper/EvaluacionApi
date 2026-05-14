import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema(
  {
    student_id: {
      type: mongoose.Types.ObjectId,
      ref: "Students",
    },
    amount: {
      type: Number,
    },
    paymentDate: {
      type: Date,
    },
    method: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    referenceNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("enrollment", enrollmentSchema);
