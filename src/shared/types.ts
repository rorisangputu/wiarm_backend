export type AdminType = {
  _id: string;
  email: string;
  password: string;
  name: string;
};

export type CampaignType = {
  _id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  images: string[];
};
