import mongoose, { Types, model } from "mongoose";
import { OrderType } from "./order.type";

const productCartSchema = new mongoose.Schema<OrderType>(
  {
    order_id: {
      type: Number,
      required: true,
    },
    checkout_id: {
      type: String,
      required: true,
    },
    user: {
      type: String,
    },
    total: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    cupon: {
      type: String,
    },
    method: {
      type: String,
    },
    product: [
      {
        theme: {
          type: Types.ObjectId,
          required: true,
          ref: "theme",
        },
      },
    ],
    receipt_url: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export const Order = model<OrderType>("order", productCartSchema);
