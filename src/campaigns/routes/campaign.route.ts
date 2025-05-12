import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import { Authenticate } from "../../middlware/AdminAuth";
import {
  createCampaign,
  deleteCampaign,
  editCampaign,
  getCampaignById,
  getCampaigns,
} from "../controllers/campaign.controller";
import { validateRequest } from "../../validators/ValidateRequest";
import { ValidateObjectId } from "../../validators/ValidateObjectId";
import { campaignValidationRules } from "../../validators/ValidationRules";

const router = Router();

const storage = multer.memoryStorage(); //want to store images in memory
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb,
  },
});

router.get("/", getCampaigns);

router.post(
  "/create",
  Authenticate,
  campaignValidationRules,
  // Middleware to check validation results
  validateRequest,
  createCampaign
);

router.get("/campaign/:id", getCampaignById);

router.put("/edit/:id", Authenticate, ValidateObjectId, editCampaign);

router.delete("/delete/:id", Authenticate, deleteCampaign);

export default router;
