import { RequestHandler } from "express";
import {
  getAllDownload,
  getSingleDownloadService,
  insertDownload,
} from "./download.service";

// get all downloads
const getDownloadController: RequestHandler = async (req, res, next) => {
  try {
    const download = await getAllDownload();
    res.status(200).json({
      result: download,
      isEmpty: download.length > 0 ? false : true,
      message: "data get succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// get single download
const getSingleDownload: RequestHandler = async (req, res, next) => {
  try {
    const download = await getSingleDownloadService(req.params.id);
    res.status(200).json({
      success: true,
      result: download,
      message: "download get succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// insert download
const downloadInsertController: RequestHandler = async (req, res, next) => {
  try {
    const download = req.body;
    const downloadData = await insertDownload(download);

    res.status(200).json({
      succes: true,
      message: "data inserted succesfully",
      result: downloadData,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getDownloadController,
  downloadInsertController,
  getSingleDownload,
};
