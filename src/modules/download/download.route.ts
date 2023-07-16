import express from "express";
import downloadController from "./download.controller";

const router = express.Router();
// get download
router.get("/", downloadController.getDownloadController);
// get single download
router.get("/:id", downloadController.getSingleDownload);
// insert download
router.post("/", downloadController.downloadInsertController);

export default router;
