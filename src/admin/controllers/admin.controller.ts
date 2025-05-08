import {NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model';
import { findAdmin } from '../utilities/findUtility';

export const adminRegister = async (req: Request, res: Response, next: NextFunction) => {
    try{
        
        let existingAdmin = await findAdmin('', req.body.email);

        if(existingAdmin){
            handleResponse(res, 400, "Admin Already exists")
            return;
        }

        existingAdmin = new Admin(req.body);
        await existingAdmin.save();

    }catch(err){
        next(err)
    }
}