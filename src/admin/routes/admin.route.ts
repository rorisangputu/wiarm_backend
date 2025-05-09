import express from 'express';
import {body, validationResult} from 'express-validator'
import { adminRegister } from '../controllers/admin.controller';

const router = express.Router();

router.post('/register',
    //Validation Rules 
    body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // Middleware to check validation results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          // Send error response and do not continue to the next middleware/controller
          res.status(400).json({ errors: errors.array() });
        }
        next(); // If validation passed, proceed to the controller
  }, adminRegister
);




export default router;
