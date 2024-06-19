import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  title: { type: String, require: true },
  type: { type: String, require: true },
  amount: { type: Number, require: true },
  userId: { type: mongoose.Types.ObjectId },
  created_at: { type: Date },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export { Transaction };
