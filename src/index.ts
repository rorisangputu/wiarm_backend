import express from "express";
import "dotenv/config";
import dbConn from "./services/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import { cloudinaryConn } from "./services/imageStorage";
import path from "path";
import { errorHandler } from "./responseHandlers/errorHandler";
import adminRoutes from "./admin/routes/admin.route";
import authRoutes from "./admin/routes/auth.route";
import campaignRoutes from "./campaigns/routes/campaign.route";

const PORT = process.env.PORT || 3001;

const db = async () => {
  await dbConn();
};
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(errorHandler);

app.use("/api/auth/user", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/campaigns", campaignRoutes);

app.use(errorHandler);
app.listen(3001, () => {
  db();
  cloudinaryConn();
  console.log(`Running app on port ${PORT}`);
});
