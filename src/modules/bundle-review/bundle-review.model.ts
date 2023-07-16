import mongoose, { model } from "mongoose";
import { BundleReviewType } from "./bundle-review.type";

const bundleReviewSchema = new mongoose.Schema<BundleReviewType>({
  name: {
    type: String,
  },
  email: {
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

export const BundleReview = model<BundleReviewType>(
  "bundleReview",
  bundleReviewSchema
);
