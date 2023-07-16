import { RequestHandler } from "express";
import {
  getAllPurchase,
  getSinglePurchaseService,
  insertPurchase,
} from "./purchase.service";

// get all purchases
const getPurchaseController: RequestHandler = async (req, res, next) => {
  try {
    const purchase = await getAllPurchase();
    res.status(200).json({
      result: purchase,
      isEmpty: purchase.length > 0 ? false : true,
      message: "data get succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// get single purchase
const getSinglePurchase: RequestHandler = async (req, res, next) => {
  try {
    const purchase = await getSinglePurchaseService(req.params.id);
    res.status(200).json({
      success: true,
      result: purchase,
      message: "purchase get succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// insert purchase
const purchaseInsertController: RequestHandler = async (req, res, next) => {
  try {
    const purchase = req.body;
    const purchaseData = await insertPurchase(purchase);

    res.status(200).json({
      succes: true,
      message: "data inserted succesfully",
      result: purchaseData,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getPurchaseController,
  purchaseInsertController,
  getSinglePurchase,
};
