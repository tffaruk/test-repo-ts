import bcrypt from "bcrypt";
import { mailSender } from "../../lib/mailSender";
import { VerificationOtpType } from "../../types";
import { User } from "../user/user.model";
import { UserType } from "../user/user.type";
import { PasswordValidationToken } from "./password.model";

// user verification for password recovery
export const verifyuser = async (email: string): Promise<UserType | null> => {
  const isUser = await User.findOne({ email: email });
  if (!isUser) {
    throw Error("Something went wrong Try again");
  } else {
    await PasswordValidationToken.deleteOne({ userId: isUser.id });
    await sendverificationOtp(isUser.id, email);
    return isUser;
  }
};

// send verification otp
export const sendverificationOtp = async (id: string, email: string) => {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  const userVerification = new PasswordValidationToken({
    userId: id,
    token: await bcrypt.hash(otp, Number(process.env.SALT)),
  });
  await userVerification.save();
  await mailSender(email, otp);
};

//verfy otp
export const verifyOtp = async (otp: string, userId: string) => {
  if (!otp && !userId) {
    throw Error("Emty details are not allowed ");
  } else {
    const verificationToken = await PasswordValidationToken.findOne({
      userId,
    });
    if (!verificationToken) {
      throw Error("There is no otp exists");
    } else {
      const { token: hasdOtp, expire } = verificationToken;

      if (expire < new Date()) {
        await PasswordValidationToken.deleteOne({ userId });
        throw Error("Otp expire session");
      } else {
        const isOtp = await bcrypt.compare(otp, hasdOtp);
        if (!isOtp) {
          throw Error("Incorrect otp please check your inbox");
        } else {
          await PasswordValidationToken.deleteOne({ userId });
        }
      }
    }
  }
};

// reset password
export const resetPassword = async (id: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
  const data = await User.updateOne(
    { id: id },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );
};

export const getPaswordRecoveryOtp = async (
  id: string
): Promise<VerificationOtpType | null> => {
  if (!id) {
    throw Error("Invalid request");
  } else {
    const isUerOtp = await PasswordValidationToken.findOne({
      userId: id,
    });

    if (!isUerOtp) {
      throw Error("Invalid userId");
    } else {
      return isUerOtp;
      // res.json({
      //   isValid: isUerOtp,
      //   message: "success get otp",
      // });
    }
  }
};

// resend verification token
export const resendOtp = async (userId: string) => {
  const user = await User.findOne({ id: userId });

  const email = user?.email;
  if (!email || !userId) {
    throw Error("Empty user information");
  } else {
    await PasswordValidationToken.deleteOne({ userId });
    await sendverificationOtp(userId, email);
  }
};
