import { ObjectId } from "mongoose";

type ProductInfo = {
  product: string;
  theme: ObjectId;
};

export type ProductCartType = {
  user_id: string;
  user_email: string;
  product: [ProductInfo];
};
