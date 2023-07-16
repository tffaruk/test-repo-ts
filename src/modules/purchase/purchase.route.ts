import express from "express";
import purchaseController from "./purchase.controller";

const router = express.Router();
// get purchase
router.get("/", purchaseController.getPurchaseController);
// get single purchase
router.get("/:id", purchaseController.getSinglePurchase);
// insert purchase
router.post("/", purchaseController.purchaseInsertController);

export default router;
