import mongoose, { model } from "mongoose";
import { VerificationOtpType } from "../../types";

// passowrd verification token model
export const passowrdValidationTokenSchema =
  new mongoose.Schema<VerificationOtpType>({
    userId: {
      type: String,
    },
    token: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // this is the expiry time in seconds
    },
    expire: {
      type: Date,
      default: Date.now() + 360000,
    },
  });

export const PasswordValidationToken = model<VerificationOtpType>(
  "password_validation_token",
  passowrdValidationTokenSchema
);
