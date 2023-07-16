export type ShowcaseType = {
  _id: string;
  title: string;
  slug: string;
  website: string;
  theme: string;
  featured: boolean;
  weight: number;
  published: boolean;
  trash: boolean;
  draft: boolean;
  date: Date | string;
};
