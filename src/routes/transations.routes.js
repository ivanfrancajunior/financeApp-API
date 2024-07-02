import { Router } from "express";
import { TransactionController } from "../controllers/transactions.controllers.js";
import { createTransactionValidation } from "../middlewares/transaction/transactionValidations.js";
import { handleAuth } from "../middlewares/handleAuth.js";
import { handleValidate } from "../middlewares/handleValidations.js";

const router = Router();

router.get("/", handleAuth, TransactionController.getTransactions);

router.get("/:id", handleAuth, TransactionController.getTransactionById);

router.delete("/:id", handleAuth, TransactionController.removeTransaction);

router.put("/:id", handleAuth, TransactionController.updateTransaction);

router.post(
  "/",
  handleAuth,
  createTransactionValidation(),
  handleValidate,
  TransactionController.createTransaction
);

export default router;
