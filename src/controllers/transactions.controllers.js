import { Transaction } from "../models/Transaction.js";
import { User } from "../models/User.js";

export class TransactionController {
  static async createTransaction(req, res) {
    const { title, type, amount } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) return res.status(422).json({ errors: ["User not found"] });

    const new_transaction = new Transaction({
      title,
      type,
      amount,
      userId: user.id,
      created_at: new Date(),
    });

    const transaction = await Transaction.create(new_transaction);

    if (!transaction)
      return res
        .status(422)
        .json({ errors: ["A problem occurred. Please try again later."] });

    return res.status(201).send();
  }

  static async getTransactions(req, res) {
    const { type, created_at, title } = req.query;

    const transactions = await Transaction.find();

    if (title) {
      const transactions_by_name = transactions.filter(
        (item) => item.title === title
      );

      if (!transactions_by_name)
        return res.status(422).json({ errors: ["Item not found"] });

      return res.json(transactions_by_name);
    }

    if (type) {
      const transactions_by_type = transactions.filter(
        (items) => items.type === type
      );
      if (!transactions_by_type)
        return res.status(422).json({ errors: ["Item not found"] });

      return res.json(transactions_by_type);
    }
    if (created_at) {
      const transactions_by_date = transactions.filter((items) =>
        items.date.includes(created_at)
      );

      if (!transactions_by_date)
        return res.status(422).json({ errors: ["Item not found"] });

      return res.json(transactions_by_date);
    }

    return res.status(200).json(transactions);
  }

  static async getTransactionById(req, res) {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);

    if (!transaction)
      return res.status(404).json({ errors: ["Item not found"] });

    return res.status(200).json(transaction);
  }

  static async updateTransaction(req, res) {
    const { id } = req.params;
    const { title, amount, type } = req.body;

    const transaction = await Transaction.findById(id);

    if (!transaction)
      return res.status(404).json({ errors: ["Item not found"] });

    if (!type && !title && !amount)
      return res
        .status(400)
        .json({ errors: ["You need to add at least one field."] });

    if (title) {
      transaction.title = title;
    }
    if (amount) {
      transaction.amount = amount;
    }
    if (type) {
      transaction.type = type;
    }

    await transaction.save();

    return res.status(204).json(transaction);
  }

  static async removeTransaction(req, res) {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);

    if (!transaction)
      return res.status(404).json({ errors: ["Item not found"] });

    await Transaction.findByIdAndDelete(transaction);

    return res.status(204).send();
  }
}
