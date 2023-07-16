import mongoose, { model } from "mongoose";
import { ReviewType } from "./review.type";

const reviewSchema = new mongoose.Schema<ReviewType>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  github: {
    type: String,
  },
  theme: {
    type: String,
  },
  subject: {
    type: String,
  },
  rating: {
    type: Number,
  },
  feedback: {
    type: String,
  },
  usertype: {
    type: String,
  },
  weight: {
    type: Number,
  },
  published: {
    type: Boolean,
  },
  trash: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const Review = model<ReviewType>("review", reviewSchema);
