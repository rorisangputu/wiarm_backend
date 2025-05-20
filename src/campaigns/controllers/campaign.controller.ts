import { NextFunction, Request, Response } from "express";
import { handleResponse } from "../../responseHandlers/resHandler";
import { CampaignType } from "../../shared/types";
import Campaign from "../model/campaign.model";
import cloudinary from "cloudinary";

export const createCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log(req.body, req.files);
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newCampaign: CampaignType = req.body;

    //1. Uploading images to cloudinary
    const imageUrls = await uploadImages(imageFiles);
    newCampaign.images = imageUrls;
    const campaign = new Campaign(newCampaign);
    await campaign.save();

    return handleResponse(res, 201, "Campaign Created", campaign);
  } catch (error) {
    next(error);
  }
};

export const getCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const campaigns = await Campaign.find();

    if (campaigns.length === 0) {
      return handleResponse(res, 404, "No Campaigns Found", []);
    }

    return handleResponse(res, 200, "Campaigns Found", campaigns);
  } catch (error) {
    next(error);
  }
};

export const getCampaignById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.params.id;
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return handleResponse(res, 404, "Campaign does not exist", null);
    }

    return handleResponse(res, 200, "Campaign Found", campaign);
  } catch (error) {
    next(error);
  }
};

export const editCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const updatedCampaign: CampaignType = req.body;

    const campaign = await Campaign.findByIdAndUpdate(
      { _id: id },
      updatedCampaign,
      { new: true }
    );

    if (!campaign) return handleResponse(res, 404, "Campaign not found", null);

    handleResponse(res, 201, "Campaign Updated", campaign);
  } catch (error) {
    next(error);
  }
};

export const deleteCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Getting campaign id from request parameter and converting it to string
    const id: string = req.params.id;

    //
    const campaign = await Campaign.findByIdAndDelete(id);

    if (!campaign) return handleResponse(res, 400, "Campaign not found", null);

    handleResponse(res, 200, "Campaign deleted", null);
  } catch (error) {
    next(error);
  }
};

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    //Converting image to base64 string
    const b64 = Buffer.from(image.buffer).toString("base64");
    //creating a string that describes and image
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    //using cloudinary sdk to upload image to cloudinary
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  //2. If Upload success, add urls to new hotels
  const images = await Promise.all(uploadPromises);
  return images;
}
