import {NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model';
import { errorHandler } from '../../responseHandlers/errorHandler';

export const adminRegister = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let user = await Admin.findOne({
            email: req.body.email
        });

        if(user){
            handleResponse(res, 400, "Admin Already exists")
            return;
        }

        user = new Admin(req.body);
        await user.save();

    }catch(err){
        next(err)
    }
}