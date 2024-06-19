import { ulid } from "ulid";
import { calculateAmount } from "../utils/calculateAmount.js";

export const createTransaction = async (req, res) => {
  const { title, type, amount } = req.body;
  const user = req.user;

  const new_transaction = {
    id: ulid(),
    title,
    type,
    amount,
    created_at: new Date().toLocaleString("pt-BR"),
  };

  user.transactions.push(new_transaction);

  user.total_balance = calculateAmount(user.transactions);

  return res.status(201).send();
};

export const getTransactions = async (req, res) => {
  const user = req.user;

  const { type, created_at, name } = req.query;

  const transactions = user.transactions;

  if (name) {
    const transactions_by_name = transactions.filter(
      (items) => items.type === name
    );
    return res.json(transactions_by_name);
  }
  if (type) {
    const transactions_by_type = transactions.filter(
      (items) => items.type === type
    );

    return res.json(transactions_by_type);
  }
  if (created_at) {
    const transactions_by_date = transactions.filter((items) =>
      items.date.includes(created_at)
    );
    return res.json(transactions_by_date);
  }

  return res.status(200).json(transactions);
};

export const getTransactionById = async (req, res) => {
  const user = req.user;

  const { id } = req.params;

  const current_transaction = user.transactions.filter(
    (transaction) => transaction.id === id
  );

  if (!current_transaction)
    return res.status(404).json({ message: "Transaction not found" });

  return res.status(200).json(current_transaction);
};

export const updateTransaction = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { title, amount } = req.body;
  const transaction = user.transactions.find((item) => item.id === id);

  if (!transaction)
    return res.status(404).json({ message: "Transaction not found" });

  if (title) {
    transaction.title = title;
  }
  if (amount) {
    transaction.amount = amount;
  }

  return res.status(204).send(transaction);
};

export const removeTransaction = async (req, res) => {
  const user = req.user;

  const { id } = req.params;

  const transactions = user.transactions;

  const has_item = await transactions.find((item) => item.id === id);

  if (has_item) {
    transactions.slice(has_item, 1);

    return res.status(200).send();
  }

  return res.status(404).json({ message: "Transaction not found" });
};
