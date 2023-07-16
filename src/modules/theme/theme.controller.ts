import { RequestHandler } from "express";
import { getAllTheme, postTheme } from "./theme.service";

const getThemeController: RequestHandler = async (req, res, next) => {
  try {
    const theme = await getAllTheme();

    res.status(200).json({
      succes: true,
      result: theme,
      message: "data get succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// insert theme
const themeInsertController: RequestHandler = async (req, res, next) => {
  const { ...theme } = req.body;

  try {
    const themeData = await postTheme(theme);
    if (themeData) {
      res.status(200).json({
        succes: true,
        message: "data inserted succesfully",
        result: themeData,
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

export default {
  getThemeController,
  themeInsertController,
};
