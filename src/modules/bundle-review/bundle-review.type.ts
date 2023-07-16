export type BundleReviewType = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  rating: number;
  feedback: string;
  weight: number;
  published: boolean;
  trash: boolean;
  date: Date | string;
};
