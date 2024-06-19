import { body } from "express-validator";

export const createUserValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Name is required.")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters."),
    body("email")
      .isString()
      .withMessage("E-mail is required.")
      .isEmail()
      .withMessage("Enter a valid e-mail address."),
    body("password")
      .isString()
      .withMessage("Password is required.")
      .isLength({ min: 5 })
      .withMessage("The password needs at least 5 characters."),
  ];
};

export const userSignInValidations = () => {
  return [
    body("email")
      .isString()
      .withMessage("E-mail is required.")
      .isEmail()
      .withMessage("Enter a valid e-mail address."),
    body("password")
      .isString()
      .withMessage("Password is required.")
      .isLength({ min: 5 })
      .withMessage("The password needs at least 5 characters."),
  ];
};

const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters."),
    body("password")
      .optional()
      .isLength({ min: 5 })
      .withMessage("The password needs at least 5 characters."),
  ];
};
