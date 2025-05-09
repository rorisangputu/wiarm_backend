import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { AuthPayload } from '../../dto/auth.dto';

export const ValidateSignature = async (req: Request): Promise<AuthPayload | null> => {
  const token = req.cookies["wiarm_admin_auth_token"];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as AuthPayload;
    req.user = decoded;
    return decoded;
  } catch {
    return null;
  }
};