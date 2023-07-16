import { Types } from "mongoose";

export type OrderType = {
  order_id: number;
  checkout_id: string;
  total: string;
  currency: string;
  receipt_url: string;
  cupon: string;
  method: string;
  user: string;
  product: {
    theme: Types.ObjectId;
  };
};
