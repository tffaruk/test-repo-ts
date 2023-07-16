import { ObjectId } from "mongoose";

export type Download = {
  purchase_id: string;
  product: [
    {
      theme: ObjectId;
    }
  ];
  download: {
    type: Date;
  };
};

export type DownloadType = {
  user_id: string;
  user_email: string;
  download_info: Download;
};
