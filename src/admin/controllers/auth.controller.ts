import { NextFunction, Request, Response } from "express";
import { AdminLoginInputs } from "../../dto/admin.dto";
import { findAdmin } from "../service/findService";
import { handleResponse } from "../../responseHandlers/resHandler";
import { passwordCompare } from "../service/passwordService";

export const adminLogin = async(req: Request, res: Response, next: NextFunction) => {
    const {email, password} = <AdminLoginInputs>req.body;

    try {
        const admin = await findAdmin(email)

        if(!admin){
            handleResponse(res, 400, "No match found with that Email/Password", null)
            return
        }

        const isMatch = await passwordCompare(password, admin.password);

        if(!isMatch){
            handleResponse(res, 400, "No match found with that Email/Password", null)
            return;
        }
        
    } catch (error) {
        next(error)
    }
}