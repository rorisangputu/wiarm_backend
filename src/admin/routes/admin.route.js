"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const admin_controller_1 = require("../controllers/admin.controller");
const router = express_1.default.Router();
router.post('/register', 
//Validation Rules 
(0, express_validator_1.body)('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'), (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'), (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), 
// Middleware to check validation results
(req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // Send error response and do not continue to the next middleware/controller
        res.status(400).json({ errors: errors.array() });
    }
    next(); // If validation passed, proceed to the controller
}, admin_controller_1.adminRegister);
exports.default = router;
