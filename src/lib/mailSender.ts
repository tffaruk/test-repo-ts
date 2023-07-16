import nodemailer from "nodemailer";
import config from "../config/variables";

export const mailSender = async (email: string, otp: string) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.sender_email,
      pass: config.sender_password,
    },
  });
  let mailDetails = {
    from: config.sender_email,
    to: email,
    subject: "Gethugothemes Account Verification",
    text: `Use this OTP to verify your account: ${otp}`,
  };
  const data = await mailTransporter.sendMail(mailDetails);
};
