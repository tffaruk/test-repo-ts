import { Types } from "mongoose";

export type DownloadInfo = [
  {
    order: Types.ObjectId;
    product: [
      {
        theme: Types.ObjectId;
      }
    ];
    download: [
      {
        download_date: Date;
      }
    ];
  }
];

export type PurchaseType = {
  user_id: string;
  user_email: string;
  download_info: DownloadInfo;
};
