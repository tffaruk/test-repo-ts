import { Trashed } from "../../types";
import { Showcase } from "./showcase.model";
import { ShowcaseType } from "./showcase.type";

// getAllShowcaseData
export const getAllShowcase = async (
  page: number,
  limit: number,
  published: boolean,
  theme: string
) => {
  if (published) {
    if (theme) {
      const showcaseTheme = await Showcase.find({
        trash: false,
        theme: theme,
        published: published,
      })
        .sort({ weight: 1 })
        .sort({ date: "descending" })
        .skip(page * limit)
        .limit(limit);
      return showcaseTheme;
    } else {
      const showcaseTheme = await Showcase.find({
        trash: false,
        published: published,
      })
        .sort({ weight: 1 })
        .sort({ date: "descending" })
        .skip(page * limit)
        .limit(limit);
      return showcaseTheme;
    }
  } else {
    if (theme) {
      const showcaseTheme = await Showcase.find({
        trash: false,
        theme: theme,
      })
        .sort({ weight: 1 })
        .sort({ date: "descending" })
        .skip(page * limit)
        .limit(limit);
      return showcaseTheme;
    } else {
      const showcaseTheme = await Showcase.find({
        trash: false,
      })
        .sort({ weight: 1 })
        .sort({ date: "descending" })
        .skip(page * limit)
        .limit(limit);
      return showcaseTheme;
    }
  }
};

export const postShowcase = async (
  showcaseData: ShowcaseType
): Promise<ShowcaseType | null> => {
  const newData = new Showcase(showcaseData);
  const showcase = await Showcase.find({});

  if (
    showcase
      .map((showcase) => new URL(showcase.website).host.replace("www.", " "))
      .includes(new URL(showcaseData.website).host.replace("www.", " "))
  ) {
    return null;
  } else {
    const insertShowcase = await newData.save();
    return insertShowcase;
  }
};

// update
export const updateShowcase = async (updatedData: ShowcaseType[]) => {
  const dataArray = updatedData.map((data) => {
    return {
      updateOne: {
        filter: { _id: data._id },
        update: {
          $set: {
            weight: data.weight,
            draft: data.draft,
            featured: data.featured,
            title: data.title,
            theme: data.theme,
            website: data.website,
            trash: data.trash,
            published: data.published,
            date: !data.date ? "2022-10-25T23:34:53.309Z" : data.date,
          },
        },
      },
    };
  });

  await Showcase.bulkWrite(dataArray);
};

// // get showcase trash data
export const getShowcaseTrash = async (): Promise<ShowcaseType[]> => {
  const showcase = await Showcase.find({ trash: true });
  return showcase;
};

// // restore showcase  trash
export const updateShowcaseTrashed = async (update: Trashed[]) => {
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

  await Showcase.bulkWrite(dataArray);
};

// delete showcase
export const deleteShowcase = async (id: string) => {
  await Showcase.deleteOne({ _id: id });
};
