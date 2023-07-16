import { RequestHandler } from "express";
import { Trashed } from "../../types";
import {
  deleteBundleReview,
  getAllBundleReview,
  getBundleReviewTrash,
  postBundleReview,
  updateBundleReview,
  updateBundleReviewTrashed,
} from "./bundle-review.service";

const getBundleReviewController: RequestHandler = async (req, res, next) => {
  let page = parseInt(req.query.page as string) - 1 || 0;
  let limit = req.query.limit
    ? parseInt(req.query.limit as string)
    : req.query.page
    ? 50
    : 0;

  try {
    const bundleReview = await getAllBundleReview(page, limit);

    res.status(200).json({
      succes: true,
      result: bundleReview,
      message: "data get succesfully",
      total: bundleReview.length / limit,
      isEmpty: bundleReview.length > 0 ? false : true,
    });
  } catch (error) {
    next(error);
  }
};

// insert bundle bundleReview
const bundleReviewInsertController: RequestHandler = async (req, res, next) => {
  try {
    const bundleReview = req.body;
    const bundleReviewData = await postBundleReview(bundleReview);
    if (bundleReviewData) {
      res.status(200).json({
        succes: true,
        message: "data inserted succesfully",
        result: bundleReviewData,
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
const bundleReviewUpdateController: RequestHandler = async (req, res, next) => {
  const bundleReview = req.body.data;
  try {
    await updateBundleReview(bundleReview);
    res.status(200).json({
      succes: true,
      message: "data updated succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// get trashed bundleReview
const getTrashedBundleReview: RequestHandler = async (req, res, next) => {
  try {
    const bundleReview = await getBundleReviewTrash();
    res.status(200).json({
      succes: true,
      isEmpty: bundleReview.length > 0 ? false : true,
      message: "data get succesfully",
      result: bundleReview,
    });
  } catch (error) {
    next(error);
  }
};

// restore trash bundleReview
const restoreBundleReviewTrashedData: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const bundleReview = req.body.updateTrash.filter(
      (data: Trashed) => data.id
    );
    await updateBundleReviewTrashed(bundleReview);
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

// delete bundleReview
const deleteBundleReviewController: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    await deleteBundleReview(id);
    res.status(200).json({
      succes: true,
      message: "data deleted succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getBundleReviewController,
  bundleReviewInsertController,
  bundleReviewUpdateController,
  getTrashedBundleReview,
  restoreBundleReviewTrashedData,
  deleteBundleReviewController,
};
