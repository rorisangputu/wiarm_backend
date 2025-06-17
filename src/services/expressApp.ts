import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoutes from "../admin/routes/admin.route";
import authRoutes from "../admin/routes/auth.route";
import campaignRoutes from "../campaigns/routes/campaign.route";
import { errorHandler } from "../responseHandlers/errorHandler";
import path from "path";

export default async (app: Application) => {
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

  app.use(express.static(path.join(__dirname, "../../../wiarm_frontend/dist")));

  app.use(errorHandler);

  app.use("/api/admin_auth", authRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/campaigns", campaignRoutes);

  return app;
};
