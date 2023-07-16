import express from "express";
import userController from "./user.controller";

const router = express.Router();
// get user
router.get("/", userController.getUserController);
// get single user
router.get("/:id", userController.getSingleUser);
// insert user
router.post("/", userController.userInsertController);
// update user data
router.patch("/update/:id", userController.userUpdateController);
//  delete testimonial
router.delete("/delete/:id", userController.deleteUserController);

// login user
router.post("/login", userController.loginController);

export default router;
