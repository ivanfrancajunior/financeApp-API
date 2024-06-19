import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  title: { type: String, require: true },
  type: { type: String, require: true },
  amount: { type: Number, require: true },
  created_at: { type: Date, default: new Date() },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export { Transaction };
