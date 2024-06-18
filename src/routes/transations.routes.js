import { Router } from "express";
import {
  getTransactions,
  createTransaction,
} from "../controllers/transactions.controllers.js";
import { handleAuth } from "../middlewares/handleAuth.js";

const router = Router();

router.get("/", handleAuth, (req, res) => getTransactions(req, res));

export default router;

router.post("/", handleAuth, (req, res) => createTransaction(req, res));
