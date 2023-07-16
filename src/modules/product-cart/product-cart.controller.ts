import { RequestHandler } from "express";
import {
  cleanProductCartService,
  deleteProductCartService,
  getAllProductCart,
  getSingleProductCartService,
  insertProductCart,
} from "./product-cart.service";

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
const getSingleProductCart: RequestHandler = async (req, res, next) => {
  try {
    const productCart = await getSingleProductCartService(req.params.id);
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
const productCartInsertController: RequestHandler = async (req, res, next) => {
  const productCart = req.body;

  try {
    const productCartData = await insertProductCart(productCart);

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
  productCartInsertController,
  getSingleProductCart,
  deleteProductCart,
  deleteCart,
};
