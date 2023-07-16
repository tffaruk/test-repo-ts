import express from "express";
import requestController from "./request.controller";

const router = express.Router();
// get request
router.get("/", requestController.getRequestController);
// insert request
router.post("/", requestController.requestInsertController);

export default router;
