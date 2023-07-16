import express from "express";
import passwordController from "./password.controller";

const router = express.Router();
// recoverry password
router.post("/verify-user", passwordController.verfyUserController);
router.patch(
  "/recovery-password/:id",
  passwordController.resetPasswordController
);
router.post("/verify-password-otp", passwordController.verfyTokenController);
router.get("/password-otp", passwordController.getPaswordRecoveryOtpController);
router.post("/resend-password-otp", passwordController.resendOtpController);

export default router;
