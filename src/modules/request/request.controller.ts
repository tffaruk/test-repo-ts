import { RequestHandler } from "express";
import { getAllRequest, insertRequest } from "./request.service";

const getRequestController: RequestHandler = async (req, res, next) => {
  try {
    const search = await getAllRequest();
    res.status(200).json({
      result: search,
      isEmpty: search.length > 0 ? false : true,
      message: "data get succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// insert review
const requestInsertController: RequestHandler = async (req, res, next) => {
  try {
    const search = req.body;
    const reviewData = await insertRequest(search);
    res.status(200).json({
      succes: true,
      message: "data inserted succesfully",
      result: reviewData,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getRequestController,
  requestInsertController,
};
