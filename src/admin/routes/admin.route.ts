import express from 'express';
import {check, validationResult} from 'express-validator'
import { adminRegister } from '../controllers/admin.controller';

const router = express.Router();

router.post('/register', adminRegister);


export default router;
