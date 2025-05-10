import { NextFunction, Request, Response } from "express";
import { handleResponse } from "../../responseHandlers/resHandler";
import { CampaignType } from "../../shared/types";
import Campaign from "../model/campaign.model";

export const createCampaign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCampaign: CampaignType = {
      ...req.body,
      image: 'https://farmsquare.ng/wp-content/uploads/2021/08/IMG_20210312_111515.jpg'
    };

    const campaign = new Campaign(newCampaign);
    await campaign.save();

    handleResponse(res, 201, 'Campaign Created', campaign);
    return;
      
  } catch (error) {
    next(error);
  }
};

export const getCampaigns = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const campaigns = await Campaign.find()

        if (campaigns.length === 0) {
            return handleResponse(res, 404, "No Campaigns Found", []);
        }

        return handleResponse(res, 200, "Campaigns Found", campaigns);
        
    } catch (error) {
        next(error)
    }
}

export const getCampaignById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const id: string = req.params.id;
        const campaign = await Campaign.findById(id);

        if (!campaign) {
            return handleResponse(res, 400, 'Campaign does not exist', null);
        }

        return handleResponse(res, 200, "Campaign Found", campaign);

    } catch (error) {
        next(error)
    }
}
