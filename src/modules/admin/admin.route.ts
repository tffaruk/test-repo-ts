import express from "express";
import adminController from "./admin.controller";

const router = express.Router();
// get admin
router.get("/", adminController.getAdminController);
// insert admin
router.post("/create", adminController.adminInsertController);
// update admin data
router.put("/update", adminController.adminUpdateController);
//  delete testimonial
router.delete("/delete/:id", adminController.deleteAdminController);

export default router;
