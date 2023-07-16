import express from "express";
import themeController from "./theme.controller";

const router = express.Router();
// get theme
router.get("/", themeController.getThemeController);
// insert theme
router.post("/", themeController.themeInsertController);

export default router;
