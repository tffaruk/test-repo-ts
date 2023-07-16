import bcrypt from "bcrypt";
import config from "../../config/variables";
import { User } from "./user.model";
import { UserType } from "./user.type";

// getAllUserData
export const getAllUser = async (): Promise<UserType[]> => {
  const user = await User.find({}).lean();
  return user;
};

// insert user
export const insertUser = async (userData: UserType) => {
  userData.id = "@ght" + userData.email.replace(/^([^@]+).*$/, "$1");
  userData.password = await bcrypt.hash(userData.password, config.salt);
  const newData = new User(userData);
  const insertedUser = await newData.save();

  return insertedUser;
};

// get single user data
export const getSingleUserService = async (
  id: string
): Promise<UserType | null> => {
  const user = await User.findOne({ user_id: id }).lean();
  return user;
};

// update
export const updateUser = async (updatedData: UserType, id: string) => {
  const result = await User.findOneAndUpdate({ id: id }, updatedData, {
    new: true,
  });
  return result;
};

// delete user
export const deleteUser = async (id: string) => {
  await User.deleteOne({ _id: id });
};

//verfy usser

// login user
export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw Error("User not found");
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw Error("Incorrect password");
    } else {
      return user;
    }
  }
};
