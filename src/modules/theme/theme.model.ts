import mongoose, { model } from "mongoose";
import { ThemeType } from "./theme.type";

const themeSchema = new mongoose.Schema<ThemeType>(
  {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
    },
    categories: {
      type: [String],
    },
    price: {
      type: Number,
    },
    theme_version: {
      type: String,
    },
    hugo_version: {
      type: String,
    },
    last_update: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Theme = model<ThemeType>("theme", themeSchema);
