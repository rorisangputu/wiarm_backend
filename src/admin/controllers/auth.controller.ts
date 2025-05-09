import { NextFunction, Request, Response } from "express";
import { AdminLoginInputs } from "../../dto/admin.dto";
import { findAdmin } from "../../utility/findUtility";
import { handleResponse } from "../../responseHandlers/resHandler";
import { GenerateSignature, passwordCompare } from '../../utility/passwordUtility';

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const {email, password} = <AdminLoginInputs>req.body;
    try {
        const admin = await findAdmin('', email)

        if(!admin){
            handleResponse(res, 400, "No match found with that Email/Password", null)
            return
        }
        console.log(password, admin.password)
        const isMatch = await passwordCompare(password, admin.password);

        if(!isMatch){
            handleResponse(res, 400, "No match found with that Password", null)
            return;
        }

        const token = GenerateSignature(admin._id)
        console.log(token)
        res.cookie("wiarm_admin_auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        });

        res.status(200).json({ admin: admin._id });
        return;
    } catch (error) {
        next(error)
    }
}