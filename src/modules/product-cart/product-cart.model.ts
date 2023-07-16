import mongoose, { model } from "mongoose";
import { ProductCartType } from "./product-cart.type";

const productCartSchema = new mongoose.Schema<ProductCartType>(
  {
    user_id: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    product: [
      {
        product: {
          type: String,
          required: true,
        },
        bundle: {
          type: Boolean,
        },
        theme: {
          type: mongoose.Types.ObjectId,
          ref: "theme",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const ProductCart = model<ProductCartType>(
  "product_cart",
  productCartSchema
);
