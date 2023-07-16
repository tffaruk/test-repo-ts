import mongoose, { model } from "mongoose";
import { VerificationOtpType } from "../../types";
import { UserType } from "./user.type";

const userSchema = new mongoose.Schema<UserType>(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      min: [8, "Must be at least 6, got {VALUE}"],
      max: 12,
    },
    profession: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    address_line_1: {
      type: String,
      required: true,
    },
    address_line_2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    zip_code: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<UserType>("user", userSchema);

// user verification token model
export const userValidationTokenSchema =
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

export const UserValidationToken = model<VerificationOtpType>(
  "user_validation_token",
  userValidationTokenSchema
);
