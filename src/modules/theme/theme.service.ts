import { Theme } from "./theme.model";
import { ThemeType } from "./theme.type";

// getAllThemeData
export const getAllTheme = async () => {
  const theme = await Theme.find();
  return theme;
};

export const postTheme = async (themeData: ThemeType): Promise<ThemeType> => {
  const newData = new Theme(themeData);

  const istheme = await Theme.findOne({ title: themeData.title });
  if (istheme) {
    throw Error("this website already has");
  } else {
    const insertTheme = await newData.save();
    return insertTheme;
  }
};
