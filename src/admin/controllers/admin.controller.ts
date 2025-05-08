import {NextFunction, Request, Response } from 'express';
import Admin from '../models/admin.model';
import { findAdmin } from '../service/findService';
import { AdminType } from '../../shared/types';
import { GeneratePassword, generateSalt, GenerateSignature } from '../service/passwordService';

export const adminRegister = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const{email, password, name} = <AdminType>req.body
        
        let admin = await findAdmin('', email);

        if(admin){
            handleResponse(res, 400, "Admin Already exists", null)
            return;
        }

        const salt = await generateSalt();
        const adminPassword = await GeneratePassword(password, salt);



        admin = new Admin({
            name: name,
            email: email,
            password: adminPassword,
            salt: salt
        });
        await admin.save();

        //JWT TOKEN CREATION
        const token = GenerateSignature(admin.id);

        res.cookie("wiarm_admin_auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });

        return handleResponse(res, 201, "Admin created successfully", admin)
    }catch(err){
        next(err)
    }
}