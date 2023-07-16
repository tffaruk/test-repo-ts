import { RequestHandler } from "express";
import {
  deleteAdmin,
  getAllAdmin,
  insertAdmin,
  updateAdmin,
} from "./admin.service";

const getAdminController: RequestHandler = async (req, res, next) => {
  try {
    const admin = await getAllAdmin();
    res.status(200).json({
      result: admin,
      isEmpty: admin.length > 0 ? false : true,
      message: "data get succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// insert admin
const adminInsertController: RequestHandler = async (req, res, next) => {
  try {
    const admin = req.body;
    const adminData = await insertAdmin(admin);
    res.status(200).json({
      succes: true,
      message: "data inserted succesfully",
      result: adminData,
    });
  } catch (error) {
    next(error);
  }
};

// update update controller
const adminUpdateController: RequestHandler = async (req, res, next) => {
  const adminData = req.body.data;
  try {
    await updateAdmin(adminData);
    res.status(200).json({
      succes: true,
      message: "data updated succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// delete showcase
const deleteAdminController: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    await deleteAdmin(id);
    res.status(200).json({
      succes: true,
      message: "data deleted succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAdminController,
  adminInsertController,
  adminUpdateController,
  deleteAdminController,
};
