import axios from "axios";
import mongoose from "mongoose";
import ApiError from "../../errors/ApiError";
import { Purchase } from "../purchase/purchase.model";
import { PurchaseType } from "../purchase/purchase.type";
import { Order } from "./order.model";
import { OrderType } from "./order.type";

// getAllOrderData
export const getAllProductCart = async () => {
  const theme = await Order.find({}).populate("product.theme");
  return theme;
};

// insert user
export const insertOrder = async (
  userData: PurchaseType,
  checkout_id: string,
  cupon: string,
  method: string
) => {
  const session = await mongoose.startSession();
  let orderInfo = null;
  try {
    session.startTransaction();
    const response = await axios.get(
      `https://sandbox-checkout.paddle.com/api/1.0/order?checkout_id=${checkout_id}`
    );

    if (!response.data) {
      throw new ApiError("Something went wrong", 500, "");
    }
    const ordeData = {
      user: userData.user_id,
      order_id: response.data.order.order_id,
      checkout_id: response.data.checkout.checkout_id,
      total: response.data.order.total,
      currency: response.data.order.currency,
      receipt_url: response.data.order.receipt_url,
      cupon: cupon,
      method: method,
      product: userData.download_info[0].product,
    };

    const newOrder = await Order.create([ordeData], { session });
    orderInfo = newOrder[0];
    if (!newOrder) {
      throw new ApiError("Something went wrong", 500, "");
    }
    const user = await Purchase.findOne({
      user_email: userData.user_email,
    });
    userData.download_info[0].order = newOrder[0]._id;
    if (!user) {
      await Purchase.create([userData], { session });
    } else {
      await Purchase.findOneAndUpdate(
        { user_id: userData.user_id },
        { $addToSet: { download_info: userData.download_info } },
        { session }
      );
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (orderInfo) {
    orderInfo = await Order.findOne({ _id: orderInfo._id })
      .populate({
        path: "product.theme",
      })
      .lean();
  }
  return orderInfo;
};

// get single user data
export const getSingleOrderService = async (
  id: string
): Promise<OrderType[] | null> => {
  const cart = await Order.find({ user_id: id });
  return cart;
};

// delete item
export const deleteProductCartService = async (id: string, itemId: string) => {
  const collection = await Order.findOne({ user_id: id });

  if (!collection) {
    throw Error("Collection not found");
  }

  const data = await Order.findOneAndUpdate(
    { user_id: id },
    { $pull: { product: { product: itemId } } }
  );
};

// clean cart
export const cleanProductCartService = async (id: string) => {
  const collection = await Order.findOne({ _id: id });
  if (!collection) {
    throw Error("Collection not found");
  }
  const data = await Order.findByIdAndDelete(id);
};
