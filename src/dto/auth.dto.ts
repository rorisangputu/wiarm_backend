export interface AuthPayload {
    adminId: string;
    email: string;
    role?: string; // optional if you have roles
  }