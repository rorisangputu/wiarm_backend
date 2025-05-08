import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { AuthPayload } from '../dto/auth.dto';


export const generateSalt = async (): Promise<string> => {
    let salt = await bcrypt.genSalt()
    return salt;
}

export const GeneratePassword = async (password: string, salt: string) => {
   return await bcrypt.hash(password, salt);
}

export const passwordCompare = async(password: string, adminPass: string) => {

    const isMatch = await bcrypt.compare(password, adminPass);
    return isMatch
}

export const GenerateSignature = async (adminId: string) => {

    const token = await jwt.sign(adminId, process.env.JWT_SECRET_KEY as string, {expiresIn: "1d"} )
    return token;
}

export const ValidateSignature = async (req: Request): Promise<AuthPayload | null> => {
    const token = req.cookies["wiarm_admin_auth_token"];
    if (!token) return null;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as AuthPayload;
      req.user = decoded; // Now typed!
      return decoded;
    } catch {
      return null;
    }
};
  