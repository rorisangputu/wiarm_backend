import express, { Router } from 'express';
import { Authenticate } from '../../middlware/AdminAuth';

const router = Router();

router.post('/campaign', Authenticate, )

export default router;
