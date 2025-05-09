import { NextFunction, Request, Response } from "express";
import { handleResponse } from "../../responseHandlers/resHandler";

export const createCampaign = async (req: Request, res: Response, next: NextFunction) => {
    console.log('You are in the campaign controller')
    handleResponse(res, 200, 'In campaign Controller', null)
}