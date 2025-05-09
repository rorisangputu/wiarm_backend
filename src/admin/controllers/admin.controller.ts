import { NextFunction, Request, Response } from 'express';
import Admin from '../models/admin.model';
import { findAdmin } from '../../utility/AdminUtility/findUtility';
import { AdminType } from '../../shared/types';
import { GeneratePassword, GenerateSignature } from '../../utility/passwordUtility';
import { handleResponse } from '../../responseHandlers/resHandler';

export const adminRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name }: AdminType = req.body;

    const existingAdmin = await findAdmin('', email);
    if (existingAdmin) {
      return handleResponse(res, 400, "Admin Already exists", null);
    }

    const hashedPassword = await GeneratePassword(password);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    const token = await GenerateSignature(newAdmin._id.toString());

    res.cookie("wiarm_admin_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return handleResponse(res, 201, "Admin created successfully", newAdmin);
  } catch (err) {
    next(err);
  }
};

