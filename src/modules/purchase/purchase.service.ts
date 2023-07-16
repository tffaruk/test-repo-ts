import { Purchase } from "./purchase.model";
import { PurchaseType } from "./purchase.type";

// getAllPurchaseData
export const getAllPurchase = async (): Promise<PurchaseType[]> => {
  const user = await Purchase.find({});
  return user;
};

// insert user
export const insertPurchase = async (userData: PurchaseType) => {
  const user = await Purchase.findOne({
    user_email: userData.user_email,
  });

  if (!user) {
    const newData = new Purchase(userData);
    const insertedPurchase = await newData.save();
    return insertedPurchase;
  } else {
    const updateData = Purchase.updateOne(
      { user_id: userData.user_id },
      { $addToSet: { download_info: userData.download_info } }
    );
    return updateData;
  }
};

export const getSinglePurchaseService = async (id: string) => {
  const product = await Purchase.findOne({ user_id: id })

    .populate({
      path: "download_info.product.theme",
      select: "title image price theme_version last_update",
    })

    .lean();

  return product;
};
