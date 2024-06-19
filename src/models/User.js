import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: { type: String, require: true },
  total_balance: { type: Number },
  transactions: { type: Array },
});

const User = mongoose.model("User", userSchema);

export { User };
