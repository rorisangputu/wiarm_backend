import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { AdminAuthPayload } from '../../dto/auth.dto';

export const ValidateSignature = async (req: Request): Promise<AdminAuthPayload | null> => {
  const token = req.cookies["wiarm_admin_auth_token"];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as AdminAuthPayload;
    req.admin = decoded;
    return decoded;
  } catch {
    return null;
  }
};