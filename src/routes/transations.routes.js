import { Router } from "express";
import {
  getTransactions,
  createTransaction,
  getTransactionById,
  updateTransaction,
  removeTransaction,
} from "../controllers/transactions.controllers.js";
import { handleAuth } from "../middlewares/handleAuth.js";

const router = Router();

router.get("/", handleAuth, (req, res) => getTransactions(req, res));

router.post("/", handleAuth, (req, res) => createTransaction(req, res));

router.get("/:id", handleAuth, (req, res) => getTransactionById(req, res));

router.delete("/:id", handleAuth, (req, res) => removeTransaction(req, res));

router.put("/:id", handleAuth, (req, res) => updateTransaction(req, res));


export default router;
