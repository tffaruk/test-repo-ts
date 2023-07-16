import mongoose, { model } from "mongoose";
import { SearchType } from "./search.type";

const searchSchema = new mongoose.Schema<SearchType>({
  key: {
    type: String,
    required: true,
  },
  page_url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const Search = model<SearchType>("search", searchSchema);
