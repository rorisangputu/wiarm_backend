export interface AuthPayload {
  userId: string;
  email: string;
  role?: string; // optional if you have roles
}

export interface AdminAuthPayload {
  adminId: string;
  email: string;
  role?: string; // optional if you have roles
}
