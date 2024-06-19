import { body } from "express-validator";

export const createTransactionValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("Title is required.")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters."),
    body("type").isString().withMessage("Type is required"),
    body("amount")
      .isNumeric()
      .withMessage("Amount is required")
      .custom((value) => value > 0)
      .withMessage("Amount must be greater than 0."),
  ];
};
