import { Router } from "express";
import {
  getTransactions,
  createTransaction,
  getTransactionById,
  updateTransaction,
  removeTransaction,
} from "../controllers/transactions.controllers.js";
import { createTransactionValidation } from "../middlewares/transaction/transactionValidations.js";
import { handleAuth } from "../middlewares/handleAuth.js";
import { handleValidate } from "../middlewares/handleValidations.js";

const router = Router();

router.get("/", handleAuth, getTransactions);

router.post(
  "/",
  handleAuth,
  createTransactionValidation(),
  handleValidate,
  createTransaction
);

router.get("/:id", handleAuth, getTransactionById);

router.delete("/:id", handleAuth, removeTransaction);

router.put(
  "/:id",
  handleAuth,
  createTransactionValidation(),
  handleValidate,
  updateTransaction
);

export default router;
