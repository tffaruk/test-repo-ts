import mongoose, { model } from "mongoose";
import { AdminType } from "./admin.type";

const adminSchema = new mongoose.Schema<AdminType>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

export const Admin = model<AdminType>("admin", adminSchema);
