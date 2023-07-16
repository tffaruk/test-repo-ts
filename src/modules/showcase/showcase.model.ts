import mongoose, { model } from "mongoose";
import { ShowcaseType } from "./showcase.type";

const showcaseSchema = new mongoose.Schema<ShowcaseType>({
  title: {
    type: String,
  },
  theme: {
    type: String,
  },
  website: {
    type: String,
  },
  slug: {
    type: String,
  },
  featured: {
    type: Boolean,
  },

  weight: {
    type: Number,
  },
  published: {
    type: Boolean,
  },
  draft: {
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

export const Showcase = model<ShowcaseType>("showcase", showcaseSchema);
