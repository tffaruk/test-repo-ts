import { Trashed } from "../../types";
import { BundleReview } from "./bundle-review.model";
import { BundleReviewType } from "./bundle-review.type";

// getAllBundle_ReviewData
export const getAllBundleReview = async (page: number, limit: number) => {
  const bundleReviewTheme = await BundleReview.find({
    trash: false,
  })
    .sort({ weight: 1 })
    .sort({ date: "descending" })
    .skip(page * limit)
    .limit(limit);
  return bundleReviewTheme;
};

export const postBundleReview = async (
  bundleReviewData: BundleReviewType
): Promise<BundleReviewType | null> => {
  const newData = new BundleReview(bundleReviewData);
  const bundleReview = await BundleReview.find({});

  if (
    bundleReview
      .map((data: BundleReviewType) => data.email)
      .includes(bundleReviewData.email)
  ) {
    {
      return null;
    }
  } else {
    const insertBundleReview = await newData.save();
    return insertBundleReview;
  }
};

// update
export const updateBundleReview = async (updatedData: BundleReviewType[]) => {
  const dataArray = updatedData.map((data) => {
    return {
      updateOne: {
        filter: { _id: data._id },
        update: {
          $set: {
            weight: data.weight,
            published: data.published,
            trash: data.trash,
            feedback: data.feedback,
            subject: data.subject,
          },
        },
      },
    };
  });

  await BundleReview.bulkWrite(dataArray);
};

// // get bundleReview trash data
export const getBundleReviewTrash = async (): Promise<BundleReviewType[]> => {
  const bundleReview = await BundleReview.find({ trash: true });
  return bundleReview;
};

// // restore bundleReview  trash
export const updateBundleReviewTrashed = async (update: Trashed[]) => {
  const dataArray = update.map((data) => {
    return {
      updateOne: {
        filter: { _id: data.id },
        update: {
          $set: {
            trash: data.trash,
          },
        },
      },
    };
  });
  await BundleReview.bulkWrite(dataArray);
};

// delete bundleReview
export const deleteBundleReview = async (id: string) => {
  await BundleReview.deleteOne({ _id: id });
};
