import { RequestHandler } from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUserService,
  insertUser,
  loginService,
  updateUser,
} from "./user.service";

// get all users
const getUserController: RequestHandler = async (req, res, next) => {
  try {
    const user = await getAllUser();
    res.status(200).json({
      result: user,
      isEmpty: user.length > 0 ? false : true,
      message: "data get succesfully",
    });
  } catch (error) {
    next(error);
  }
};
//
const loginController: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await loginService(email, password);

    res.status(200).json({
      result: user,
    });
  } catch (error) {
    next(error);
  }
};

// get single user
const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await getSingleUserService(req.params.id);

    res.status(200).json({
      success: true,
      user: user,
      message: "user get succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// insert user
const userInsertController: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const userData = await insertUser(user);

    res.status(200).json({
      succes: true,
      message: "data inserted succesfully",
      result: userData,
    });
  } catch (error) {
    next(error);
  }
};

// update update controller
const userUpdateController: RequestHandler = async (req, res, next) => {
  const userData = req.body;

  try {
    await updateUser(userData, req.params.id);
    res.status(200).json({
      succes: true,
      message: "data updated succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// delete showcase
const deleteUserController: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    await deleteUser(id);
    res.status(200).json({
      succes: true,
      message: "data deleted succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getUserController,
  userInsertController,
  userUpdateController,
  deleteUserController,
  getSingleUser,

  loginController,
};
