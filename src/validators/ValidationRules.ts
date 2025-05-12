import { body } from "express-validator";

export const campaignValidationRules = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),

  body("date").notEmpty().withMessage("Date is required"),

  body("location").notEmpty().withMessage("Location is required"),
];
