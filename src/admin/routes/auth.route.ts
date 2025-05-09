import express, { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator'
import { adminLogin } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login',[
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more character is required").isLength({
        min: 6
    })
    ],
    // Middleware to check validation results
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Send error response and do not continue to the next middleware/controller
            res.status(400).json({ errors: errors.array() });
        }
        next(); // If validation passed, proceed to the controller
    },
    adminLogin
);

export default router;

