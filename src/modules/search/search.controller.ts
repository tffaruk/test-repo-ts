import { RequestHandler } from "express";
import { deleteSearch, getAllSearch, insertSearch } from "./search.service";

const sortByFrequency = (array: string[]) => {
  let objectData: any = {};
  let newArr = [];
  array.map((d) => {
    objectData[d] ? (objectData[d] += 1) : (objectData[d] = 1);
  });
  for (let key in objectData) {
    newArr.push({
      value: key,
      number: objectData[key],
    });
  }
  newArr.sort((a, b) => b.number - a.number);
  return newArr;
};

const getSearchController: RequestHandler = async (req, res, next) => {
  try {
    const search = await getAllSearch();
    res.status(200).json({
      result: sortByFrequency(search.map((d) => d.key.split(",")).flat(1)),
      searchData: search,
      isEmpty: search.length > 0 ? false : true,
      message: "data get succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// insert search
const searchInsertController: RequestHandler = async (req, res, next) => {
  try {
    const search = req.body;
    const searchData = await insertSearch(search);
    res.status(200).json({
      succes: true,
      message: "data inserted succesfully",
      result: searchData,
    });
  } catch (error) {
    next(error);
  }
};

// delete showcase
const deleteSearchController: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    await deleteSearch(id);
    res.status(200).json({
      succes: true,
      message: "data deleted succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getSearchController,
  searchInsertController,
  deleteSearchController,
};
