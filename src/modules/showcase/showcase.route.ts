import express from "express";
import { checkToken } from "../../middleware/checkToken";
import showcaseController from "./showcase.controller";

const router = express.Router();
// get showcase
router.get("/", showcaseController.getShowcaseController);
// insert showcase
router.post("/", showcaseController.showcaseInsertController);
// update showcase data
router.put("/update", showcaseController.showcaseUpdateController);
// get trashed data
router.get("/trash", showcaseController.getTrashedshowcase);
// restore trashed data
router.put("/restore-trash", showcaseController.restoreShowcaseTrashedData);
//  delete testimonial
router.delete(
  "/delete/:id",
  checkToken,
  showcaseController.deleteShowcaseController
);

export default router;
