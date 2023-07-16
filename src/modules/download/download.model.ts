import mongoose, { model } from "mongoose";
import { DownloadType } from "./download.type";

const downloadSchema = new mongoose.Schema<DownloadType>(
  {
    user_id: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    download_info: [
      {
        purchase_id: {
          type: String,
          // required: true,
        },
        product: [
          {
            theme: {
              type: mongoose.Types.ObjectId,
              required: true,
              ref: "theme",
            },
          },
        ],
        download: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Download = model<DownloadType>("download", downloadSchema);
