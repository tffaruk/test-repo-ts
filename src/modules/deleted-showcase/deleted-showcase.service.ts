import { DeletedShowcase } from "./deleted-showcase.model";
import { DeletedShowcaseType } from "./deleted-showcase.type";

// getAllDeletedShowcaseData
export const getAllDeletedShowcase = async (): Promise<
  DeletedShowcaseType[]
> => {
  const deletedShowcase = await DeletedShowcase.find({});
  return deletedShowcase;
};

// insert deletedShowcase
export const insertDeletedShowcase = async (
  deletedShowcaseData: DeletedShowcaseType
) => {
  const newData = new DeletedShowcase(deletedShowcaseData);
  const insertedDeletedShowcase = await newData.save();

  await DeletedShowcase.deleteOne({ website: deletedShowcaseData.website });

  return insertedDeletedShowcase;
};
