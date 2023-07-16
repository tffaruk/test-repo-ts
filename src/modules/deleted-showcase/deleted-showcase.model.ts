import mongoose, { model } from "mongoose";
import { DeletedShowcaseType } from "./deleted-showcase.type";

const deletedShowcaseSchema = new mongoose.Schema<DeletedShowcaseType>({
  website: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  generator: {
    type: String,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const DeletedShowcase = model<DeletedShowcaseType>(
  "deletedShowcase",
  deletedShowcaseSchema
);
