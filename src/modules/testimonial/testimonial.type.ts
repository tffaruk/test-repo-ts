export type TestimonialType = {
  _id: string;
  name: string;
  company: string;
  website: string;
  designation: string;
  linkedin: string;
  twitter: string;
  project: string;
  usability: string;
  enjoyed: string;
  improvement: string;
  feedback: string;
  rating: number;
  weight: number;
  published: boolean;
  trash: boolean;
  date: Date;
};

export type TrashedTestimonial = {
  id: string;
  trash: boolean;
};
