import { Search } from "./search.model";
import { SearchType } from "./search.type";

// getAllSearchData
export const getAllSearch = async (): Promise<SearchType[]> => {
  const admin = await Search.find({});
  return admin;
};

// insert admin

export const insertSearch = async (adminData: SearchType) => {
  const newData = new Search(adminData);
  const insertedSearch = await newData.save();
  return insertedSearch;
};

// delete showcase
export const deleteSearch = async (id: string) => {
  await Search.deleteOne({ _id: id });
};
