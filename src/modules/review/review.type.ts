export type ReviewType = {
  _id: string;
  name: string;
  email: string;
  github: string;
  theme: string;
  subject: string;
  rating: number;
  feedback: string;
  usertype: string;
  weight: number;
  published: boolean;
  trash: boolean;
  date: Date | string;
};
