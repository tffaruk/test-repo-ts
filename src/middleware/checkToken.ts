import { RequestHandler } from "express";
import config from "../config/variables";

export const checkToken: RequestHandler = (req, res, next) => {
  const { authorization }: any = req.headers;
  try {
    const token = authorization.split(" ")[1];
    if (token == config.token) {
      next();
    }
  } catch (error) {
    next("faild fetching");
  }
};
