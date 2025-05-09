import { NextFunction, Request, Response } from "express";
import { handleResponse } from "../../responseHandlers/resHandler";
import { CampaignType } from "../../shared/types";

export const createCampaign = async (req: Request, res: Response, next: NextFunction) => {
   
    try {
        const { title, description, location, date }: CampaignType = req.body;
        
    } catch (error) {
        
    }
}