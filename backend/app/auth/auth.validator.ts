import { body } from "express-validator";

/**
 * Validation rules for user signup
 */
export const signupValidator = [
  body("email").isString().notEmpty().withMessage("email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

/**
 * Validation rules for user login
 */
export const loginValidator = [
  body("email").isString().notEmpty().withMessage("email is required"),
  body("password").exists().withMessage("Password is required"),
];
