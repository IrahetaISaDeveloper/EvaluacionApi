import { Schema, model } from "mongoose";

const especialitySchema = new Schema(
  {
    specialityName: {
      type: String,
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

export default model("especiality", especialitySchema);
