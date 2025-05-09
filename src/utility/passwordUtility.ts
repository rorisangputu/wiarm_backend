import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { AuthPayload } from '../dto/auth.dto';

export const GeneratePassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10); // salt rounds = 10
};

export const passwordCompare = async (password: string, hashed: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashed);
};

export const GenerateSignature = async (adminId: string): Promise<string> => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" });
};

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
