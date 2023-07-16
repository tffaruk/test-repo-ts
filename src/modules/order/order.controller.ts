import { RequestHandler } from "express";
import {
  cleanProductCartService,
  deleteProductCartService,
  getAllProductCart,
  getSingleOrderService,
  insertOrder,
} from "./order.service";

// get all productCarts
const getProductCartController: RequestHandler = async (req, res, next) => {
  try {
    const productCart = await getAllProductCart();
    res.status(200).json({
      result: productCart,
      isEmpty: productCart.length > 0 ? false : true,
      message: "data get succesfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get single productCart
const getSingleOrder: RequestHandler = async (req, res, next) => {
  try {
    const productCart = await getSingleOrderService(req.params.id);
    res.status(200).json({
      success: true,
      result: productCart,
      message: "productCart get succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// insert productCart
const orderInsertController: RequestHandler = async (req, res, next) => {
  const { checkout_id, cupon, method, ...userData } = req.body;

  try {
    const productCartData = await insertOrder(
      userData,
      checkout_id,
      cupon,
      method
    );

    res.status(200).json({
      succes: true,
      message: "data inserted succesfully",
      result: productCartData,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// delete productCart
const deleteProductCart: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const itemId = req.query.itemId;
  try {
    await deleteProductCartService(id, String(itemId));
    res.status(200).json({
      succes: true,
      message: "data deleted succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// delete productCart
const deleteCart: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const itemId = req.query.itemId;
  try {
    await cleanProductCartService(id);
    res.status(200).json({
      succes: true,
      message: "data deleted succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getProductCartController,
  orderInsertController,
  getSingleOrder,
  deleteProductCart,
  deleteCart,
};
