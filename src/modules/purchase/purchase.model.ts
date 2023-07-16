import mongoose, { Schema, Types, model } from "mongoose";
import { DownloadInfo, PurchaseType } from "./purchase.type";

const downloadInfoSchema = new Schema<DownloadInfo>(
  [
    {
      order: {
        type: Types.ObjectId,
        ref: "order",
      },
      product: [
        {
          theme: {
            type: Types.ObjectId,
            ref: "theme",
          },
        },
      ],
      download: [
        {
          download_date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
  {
    timestamps: true,
  }
);

const purchaseSchema = new mongoose.Schema<PurchaseType>(
  {
    user_id: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    download_info: [downloadInfoSchema],
  },
  {
    timestamps: true,
  }
);

export const Purchase = model<PurchaseType>("purchase", purchaseSchema);
