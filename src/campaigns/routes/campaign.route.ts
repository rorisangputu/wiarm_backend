import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer'
import { Authenticate } from '../../middlware/AdminAuth';
import { createCampaign } from '../controllers/campaign.controller';
import { body, validationResult } from 'express-validator';
import { validateRequest } from '../../middlware/ValidateRequest';

const router = Router();

const storage = multer.memoryStorage(); //want to store images in memory
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb,

    }
})

router.post('/create', Authenticate,
    [
        body('title').notEmpty().withMessage('Title is required').isString().withMessage('Name must be a string'),
        body('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string'),
        body('date').notEmpty().withMessage("Date is required"),
        body('location').notEmpty().withMessage("Location is required"),
    ], // Middleware to check validation results
    validateRequest,
    createCampaign);

export default router;
