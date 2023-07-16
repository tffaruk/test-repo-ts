import express from "express";
import searchController from "./search.controller";

const router = express.Router();
// get search
router.get("/", searchController.getSearchController);
// insert search
router.post("/", searchController.searchInsertController);

//  delete search
router.delete("/delete/:id", searchController.deleteSearchController);

export default router;
