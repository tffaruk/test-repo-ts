import express from "express";
import { checkToken } from "../../middleware/checkToken";
import reviewController from "./review.controller";

const router = express.Router();
// get review
router.get("/", reviewController.getReviewController);
// insert review
router.post("/", reviewController.reviewInsertController);
// update review data
router.put("/update", reviewController.reviewUpdateController);
// get trashed data
router.get("/trash", reviewController.getTrashedreview);
// restore trashed data
router.put("/restore-trash", reviewController.restoreReviewTrashedData);
//  delete review
router.delete(
  "/delete/:id",
  checkToken,
  reviewController.deleteReviewController
);

export default router;
