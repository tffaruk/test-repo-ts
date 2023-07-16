import { RequestHandler } from "express";
import {
  getAllDeletedShowcase,
  insertDeletedShowcase,
} from "./deleted-showcase.service";

const getDeletedShocaseController: RequestHandler = async (req, res, next) => {
  try {
    const deletedShowcase = await getAllDeletedShowcase();
    res.status(200).json({
      result: deletedShowcase,
      isEmpty: deletedShowcase.length > 0 ? false : true,
      message: "data get succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// insert deletedShowcase
const deletedShowcaseInsertController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const deletedShowcase = req.body;
    const deletedShowcaseData = await insertDeletedShowcase(deletedShowcase);
    res.status(200).json({
      succes: true,
      message: "data inserted succesfully",
      result: deletedShowcaseData,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getDeletedShocaseController,
  deletedShowcaseInsertController,
};
