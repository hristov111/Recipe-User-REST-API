import { body } from "express-validator";

export const createUserValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username required")
    .isString()
    .withMessage("Must be a string")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{5,10}$/)
    .withMessage(
      "One uppercase character\nOne lowercase character\nOne number\nSpecial character\nBetween 5 and 10 characters"
    ),
  body("email").isEmail().withMessage("Email is required"),
  body("password").isStrongPassword().withMessage("Password is too weak"),
];

export const loginUserUserValidator = [
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password required"),
];
