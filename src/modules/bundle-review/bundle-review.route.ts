import express from "express";
import { checkToken } from "../../middleware/checkToken";
import bundleReviewController from "./bundle-review.controller";

const router = express.Router();
// get bundleReview
router.get("/", bundleReviewController.getBundleReviewController);
// insert bundleReview
router.post("/", bundleReviewController.bundleReviewInsertController);
// update bundleReview data
router.put("/update", bundleReviewController.bundleReviewUpdateController);
// get trashed data
router.get("/trash", bundleReviewController.getTrashedBundleReview);
// restore trashed data
router.put(
  "/restore-trash",
  bundleReviewController.restoreBundleReviewTrashedData
);
//  delete bundleReview
router.delete(
  "/delete/:id",
  checkToken,
  bundleReviewController.deleteBundleReviewController
);

export default router;
