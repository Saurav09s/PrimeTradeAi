import { body } from "express-validator";

import {
  PASSWORD_REGEX,
  EMAIL_REGEX
} from "../utils/constants.js";

export const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage(
      "Name must be at least 2 characters"
    ),

  body("email")
    .trim()
    .isEmail()
    .withMessage(
      "Please enter a valid email address"
    )
    .normalizeEmail(),

  body("password")
    .matches(PASSWORD_REGEX)
    .withMessage(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
    )
];

export const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage(
      "Please enter a valid email address"
    )
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage(
      "Password is required"
    )
];