import { DraftWeight, Trashed } from "../../types";
import { Testimonial } from "./testimonial.model";
import { TestimonialType } from "./testimonial.type";
export const getAllTestimonial = async (
  page: number,
  limit: number
): Promise<TestimonialType[]> => {
  const testimonial = await Testimonial.find({ trash: false })
    .sort({ weight: 1 })
    .sort({ date: "descending" })
    .skip(page * limit)
    .limit(limit);

  return testimonial;
};

// insert testimonial
export const insertTestimonial = async (
  testimonial: TestimonialType
): Promise<TestimonialType> => {
  const testmonial = new Testimonial(testimonial);

  const createTestimonial = await testmonial.save();
  if (!createTestimonial) {
    throw Error("unable to save testimonial");
  }

  return createTestimonial;
};

// update testimonial
export const updateTestimonial = async (updatedData: TestimonialType[]) => {
  const dataArray = updatedData.map((data) => {
    return {
      updateOne: {
        filter: { _id: data._id },
        update: {
          $set: {
            weight: data.weight,
            published: data.published,
            trash: data.trash,
          },
        },
      },
    };
  });

  await Testimonial.bulkWrite(dataArray);
};

// // get testimonial trash data
export const getTestimonialTrash = async (): Promise<TestimonialType[]> => {
  const testimonial = await Testimonial.find({ trash: true });
  return testimonial;
};

// // update testimonial trash
export const updateTestimonialTrash = async (update: Trashed[]) => {
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

  await Testimonial.bulkWrite(dataArray);
};

// update weight and draft
export const updateSingleTestimonial = async (
  updateData: DraftWeight,
  id: string
) => {
  await Testimonial.updateOne(
    { _id: id },

    {
      $set: {
        weight: updateData.weight,
        draft: updateData.draft,
      },
    }
  );
};

// delete testimonial
export const deleteTestimonial = async (id: string) => {
  await Testimonial.deleteOne({ _id: id });
};
