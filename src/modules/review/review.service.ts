import { Trashed } from "../../types";
import { Review } from "./review.model";
import { ReviewType } from "./review.type";

// getAllReviewData
export const getAllReview = async (
  page: number,
  limit: number,
  theme: string
) => {
  if (theme) {
    const reviewTheme = await Review.find({
      trash: false,
      theme: theme,
    })
      .sort({ weight: 1 })
      .sort({ date: "descending" })
      .skip(page * limit)
      .limit(limit);

    return reviewTheme;
  } else {
    const reviewTheme = await Review.find({
      trash: false,
    })
      .sort({ weight: 1 })
      .sort({ date: "descending" })
      .skip(page * limit)
      .limit(limit);
    return reviewTheme;
  }
};

export const postReview = async (
  reviewData: ReviewType
): Promise<ReviewType | null> => {
  const newData = new Review(reviewData);
  const review = await Review.find({});

  if (review.map((data) => data.theme).includes(reviewData.theme)) {
    if (
      (reviewData.github &&
        review.map((data) => data.github).includes(reviewData.github)) ||
      (reviewData.email &&
        review.map((data) => data.email).includes(reviewData.email))
    ) {
      return null;
    } else {
      const insertReview = await newData.save();
      return insertReview;
    }
  } else {
    const insertReview = await newData.save();
    return insertReview;
  }
};

// update
export const updateReview = async (updatedData: ReviewType[]) => {
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
          },
        },
      },
    };
  });

  await Review.bulkWrite(dataArray);
};

// // get review trash data
export const getReviewTrash = async (): Promise<ReviewType[]> => {
  const review = await Review.find({ trash: true });
  return review;
};

// // restore review  trash
export const updateReviewTrashed = async (update: Trashed[]) => {
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
  await Review.bulkWrite(dataArray);
};

// delete review
export const deleteReview = async (id: string) => {
  await Review.deleteOne({ _id: id });
};
