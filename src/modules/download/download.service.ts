import { Download } from "./download.model";
import { DownloadType } from "./download.type";

// getAllDownloadData
export const getAllDownload = async (): Promise<DownloadType[]> => {
  const user = await Download.find({});
  return user;
};

// insert user
export const insertDownload = async (userData: DownloadType) => {
  const user = await Download.findOne({
    user_email: userData.user_email,
  });
  if (!user) {
    const newData = new Download(userData);
    const insertedDownload = await newData.save();
    return insertedDownload;
  } else {
    const updateData = Download.updateOne(
      { email: userData.user_email },
      { $addToSet: { download_info: userData.download_info } }
    );
    return updateData;
  }
};

// get single user data
export const getSingleDownloadService = async (
  id: string
): Promise<DownloadType> => {
  const user: any = await Download.findOne({ user_id: id })
    .populate({
      path: "download_info.theme",
      select: "title image price theme_version last_update ",
    })
    .lean();
  return user;
};
