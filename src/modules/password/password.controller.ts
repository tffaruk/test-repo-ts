import { RequestHandler } from "express";
import {
  getPaswordRecoveryOtp,
  resendOtp,
  resetPassword,
  verifyOtp,
  verifyuser,
} from "./password.service";

// verify user
const verfyUserController: RequestHandler = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await verifyuser(req.body.email);
    res.json({
      status: "Verified",
      message: "user verify successfully",
      result: user,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// veryfy token
const verfyTokenController: RequestHandler = async (req, res, next) => {
  try {
    await verifyOtp(req.body.otp, req.body.userId);
    res.json({
      status: "Verified",
      message: "user verify successfully",
    });
  } catch (error) {
    next(error);
  }
};

// reset password controller
const resetPasswordController: RequestHandler = async (req, res, next) => {
  const { password } = req.body;
  console.log(password);
  try {
    await resetPassword(req.params.id, password);
    res.status(200).json({
      success: true,
      message: "password updated",
    });
  } catch (error) {
    next(error);
  }
};

//  resend otp
const resendOtpController: RequestHandler = async (req, res, next) => {
  const { id } = req.body;
  try {
    await resendOtp(id);
    res.status(200).json({
      succes: true,
      message: "otp send succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// recovery otp controller
const getPaswordRecoveryOtpController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const isUerOtp = await getPaswordRecoveryOtp(req.query.id as string);
    res.json({
      isValid: isUerOtp,
      message: "success get otp",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  verfyUserController,
  verfyTokenController,
  resendOtpController,
  resetPasswordController,
  getPaswordRecoveryOtpController,
};
