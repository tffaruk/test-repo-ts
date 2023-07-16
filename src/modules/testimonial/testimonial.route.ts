import express from "express";
import { checkToken } from "../../middleware/checkToken";
import testimonialController from "./testimonial.controller";

const router = express.Router();

// get testimonial data
router.get("/", checkToken, testimonialController.getTestimonialController);

// insert testimonial
router.post("/", checkToken, testimonialController.testimonialInsertController);
// update bulk amonunt testimonial
router.put(
  "/update",
  checkToken,
  testimonialController.testimonialUpdateController
);
// get trashed data
router.get("/trash", checkToken, testimonialController.getTrashedTestimonial);
// restore trashed data
router.put(
  "/restore-trash",
  checkToken,
  testimonialController.restoreTrashedData
);

// update weight and draft
router.patch(
  "/update/:id",
  checkToken,
  testimonialController.updateWeightAndDraft
);

//  delete testimonial
router.delete(
  "/delete/:id",
  checkToken,
  testimonialController.deleteTestimonialController
);
export default router;
