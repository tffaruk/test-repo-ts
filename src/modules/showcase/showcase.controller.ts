import { RequestHandler } from "express";
import { Trashed } from "../../types";
import {
  deleteShowcase,
  getAllShowcase,
  getShowcaseTrash,
  postShowcase,
  updateShowcase,
  updateShowcaseTrashed,
} from "./showcase.service";

const getShowcaseController: RequestHandler = async (req, res, next) => {
  let page = parseInt(req.query.page as string) - 1 || 0;
  let limit = req.query.limit
    ? parseInt(req.query.limit as string)
    : req.query.page
    ? 50
    : 0;

  let theme = req.query.theme || "";
  let published = req.query.published === "published" ? true : false;
  try {
    const showcase = await getAllShowcase(
      page,
      limit,
      published,
      theme as string
    );

    res.status(200).json({
      succes: true,
      result: showcase,
      message: "data get succesfully",
      total: showcase.length / limit,
      isEmpty: showcase.length > 0 ? false : true,
    });
  } catch (error) {
    next(error);
  }
};

// insert showcase
const showcaseInsertController: RequestHandler = async (req, res, next) => {
  try {
    const showcase = req.body;
    const showcaseData = await postShowcase(showcase);
    if (showcaseData) {
      res.status(200).json({
        succes: true,
        message: "data inserted succesfully",
        result: showcaseData,
      });
    } else {
      res.status(403).json({
        error: "this website already has",
        message: "data already has",
      });
    }
  } catch (error) {
    next(error);
  }
};

// update update controller
const showcaseUpdateController: RequestHandler = async (req, res, next) => {
  const showcase = req.body.data;
  try {
    await updateShowcase(showcase);
    res.status(200).json({
      succes: true,
      message: "data updated succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// get trashed showcase
const getTrashedshowcase: RequestHandler = async (req, res, next) => {
  try {
    const showcase = await getShowcaseTrash();
    res.status(200).json({
      succes: true,
      isEmpty: showcase.length > 0 ? false : true,
      message: "data get succesfully",
      result: showcase,
    });
  } catch (error) {
    next(error);
  }
};

// restore trash showcase
const restoreShowcaseTrashedData: RequestHandler = async (req, res, next) => {
  try {
    const showcase = req.body.updateTrash.filter((data: Trashed) => data.id);
    await updateShowcaseTrashed(showcase);
    res.status(200).json({
      succes: true,
      message: "data restored succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// delete showcase
const deleteShowcaseController: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    await deleteShowcase(id);
    res.status(200).json({
      succes: true,
      message: "data deleted succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getShowcaseController,
  showcaseInsertController,
  showcaseUpdateController,
  getTrashedshowcase,
  restoreShowcaseTrashedData,
  deleteShowcaseController,
};
