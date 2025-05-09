import { NextFunction, Request, Response } from 'express';
import { AdminLoginInputs } from '../../dto/admin.dto';
import { findAdmin } from '../../utility/AdminUtility/findUtility';
import { handleResponse } from '../../responseHandlers/resHandler';
import { GenerateSignature, passwordCompare } from '../../utility/passwordUtility';

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = <AdminLoginInputs>req.body;

    const admin = await findAdmin('', email);
    if (!admin) {
      return handleResponse(res, 400, "No match found with Email/Password", null);
    }

    const isMatch = await passwordCompare(password, admin.password);
    if (!isMatch) {
      return handleResponse(res, 400, "No match found with Password", null);
    }

    const token = await GenerateSignature(admin._id.toString());

    res.cookie("wiarm_admin_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return handleResponse(res, 200, "Admin Logged In", {admin: admin._id} );
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
    
    try {
        res.cookie("wiarm_admin_auth_token", "", {
            expires: new Date(0),
        });

        return handleResponse(res, 200, "User logged out", null);
        
    } catch (error) {
        next(error);
    }
}

