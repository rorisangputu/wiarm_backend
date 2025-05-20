import mongoose, { Schema } from "mongoose";
import { CampaignType } from "../../shared/types";

const campaignSchema = new Schema<CampaignType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Campaign = mongoose.model<CampaignType>("Campaign", campaignSchema);
export default Campaign;
