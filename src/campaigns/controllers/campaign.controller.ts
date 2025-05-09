import { NextFunction, Request, Response } from "express";
import { handleResponse } from "../../responseHandlers/resHandler";
import { CampaignType } from "../../shared/types";
import Campaign from "../model/campaign.model";

export const createCampaign = async (req: Request, res: Response, next: NextFunction) => {
   
    try {
        const newCampaign: CampaignType = req.body;
        newCampaign.image = 'https://farmsquare.ng/wp-content/uploads/2021/08/IMG_20210312_111515.jpg'
        const campaign = new Campaign(newCampaign);
        await campaign.save();

        handleResponse(res, 201, 'Campaign Created', campaign)
        
    } catch (error) {
        next(error);
    }
}