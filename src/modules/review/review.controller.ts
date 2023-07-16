import { RequestHandler } from "express";
import { Trashed } from "../../types";
import {
  deleteReview,
  getAllReview,
  getReviewTrash,
  postReview,
  updateReview,
  updateReviewTrashed,
} from "./review.service";

const getReviewController: RequestHandler = async (req, res, next) => {
  let page = parseInt(req.query.page as string) - 1 || 0;
  let limit = req.query.limit
    ? parseInt(req.query.limit as string)
    : req.query.page
    ? 50
    : 0;
  let theme = req.query.theme || "";

  try {
    const review = await getAllReview(page, limit, theme as string);

    res.status(200).json({
      succes: true,
      result: review,
      message: "data get succesfully",
      total: review.length / limit,
      isEmpty: review.length > 0 ? false : true,
    });
  } catch (error) {
    next(error);
  }
};

// insert review
const reviewInsertController: RequestHandler = async (req, res, next) => {
  try {
    const review = req.body;
    const reviewData = await postReview(review);
    if (reviewData) {
      res.status(200).json({
        succes: true,
        message: "data inserted succesfully",
        result: reviewData,
      });
    } else {
      res.status(403).json({
        error: "this website already has",
        message: "data already has",
      });
    }
  } catch (error) {
    next(error);
  }
};

// update update controller
const reviewUpdateController: RequestHandler = async (req, res, next) => {
  const review = req.body.data;
  try {
    await updateReview(review);
    res.status(200).json({
      succes: true,
      message: "data updated succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// get trashed review
const getTrashedreview: RequestHandler = async (req, res, next) => {
  try {
    const review = await getReviewTrash();
    res.status(200).json({
      succes: true,
      isEmpty: review.length > 0 ? false : true,
      message: "data get succesfully",
      result: review,
    });
  } catch (error) {
    next(error);
  }
};

// restore trash review
const restoreReviewTrashedData: RequestHandler = async (req, res, next) => {
  try {
    const review = req.body.updateTrash.filter((data: Trashed) => data.id);
    await updateReviewTrashed(review);
    res.status(200).json({
      succes: true,
      message: "data restored succesfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "there is server side error",
    });
  }
};

// delete review
const deleteReviewController: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    await deleteReview(id);
    res.status(200).json({
      succes: true,
      message: "data deleted succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getReviewController,
  reviewInsertController,
  reviewUpdateController,
  getTrashedreview,
  restoreReviewTrashedData,
  deleteReviewController,
};
