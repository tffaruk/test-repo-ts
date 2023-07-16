import mongoose from "mongoose";
import { ErrorMessage, ErrorResponse } from "../types";

export const handleValidationErrors = (
  error: mongoose.Error.ValidationError
): ErrorResponse => {
  const errors: ErrorMessage[] = Object.keys(error.errors).map((el: string) => {
    return {
      path: error.errors[el].path,
      message: error.errors[el].message,
    };
  });
  const statusCode = 500;
  return {
    message: "Validation Error",
    errormessage: errors,
    statusCode: statusCode,
  };
};
