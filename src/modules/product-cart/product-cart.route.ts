import express from "express";
import productCartController from "./product-cart.controller";

const router = express.Router();
// get product
router.get("/", productCartController.getProductCartController);
// get single product
router.get("/:id", productCartController.getSingleProductCart);
// insert product
router.post("/", productCartController.productCartInsertController);
// delete product
router.delete("/delete/:id", productCartController.deleteProductCart);
router.delete("/:id", productCartController.deleteCart);

export default router;
