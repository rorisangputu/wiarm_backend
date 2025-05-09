import express, { Router } from 'express';
import { Authenticate } from '../../middlware/AdminAuth';
import { createCampaign } from '../controllers/campaign.controller';

const router = Router();

router.post('/create', Authenticate, createCampaign);

export default router;
