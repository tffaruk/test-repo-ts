import express from "express";
import adminController from "./deleted-showcase.controller";

const router = express.Router();
// get admin
router.get("/", adminController.getDeletedShocaseController);
// insert admin
router.post("/", adminController.deletedShowcaseInsertController);

export default router;
