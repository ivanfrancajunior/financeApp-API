import { ulid } from "ulid";

export const getTransactions = async (req, res) => {
  const user = req.user;

  const transactions = user.transactions;

  return res.status(200).json(transactions);
};

export const createTransaction = async (req, res) => {
  const user = req.user;

  const { title, type, amount } = req.body;

  const new_transaction = {
    id: ulid(),
    title,
    type,
    amount,
    date: Date.now(),
  };

  user.transactions.push(new_transaction);

  return res.status(201).send();
};
