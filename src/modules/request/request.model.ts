import mongoose, { model } from "mongoose";
import { RequestType } from "./request.type";

const requestSchema = new mongoose.Schema<RequestType>({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const Request = model<RequestType>("request", requestSchema);
