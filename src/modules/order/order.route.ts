import express from "express";
import productCartController from "./order.controller";

const router = express.Router();
// get product
router.get("/", productCartController.getProductCartController);
// get single product
router.get("/:id", productCartController.getSingleOrder);
// insert product
router.post("/", productCartController.orderInsertController);
// delete product
router.delete("/delete/:id", productCartController.deleteProductCart);
// delete cart
router.delete("/:id", productCartController.deleteCart);

export default router;
