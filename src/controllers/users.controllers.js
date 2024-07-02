import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ulid } from "ulid";
import { User } from "../models/User.js";
import { Transaction } from "../models/Transaction.js";
import { calculateAmount } from "../utils/calculateAmount.js";
import { generateHashPassword } from "../utils/generateHash.js";

const JWT_SECRET = process.env.JWT_SECRET;

export class UserController {
  static async createUser(req, res) {
    const { name, email, password } = req.body;

    const alreadyExist = await User.findOne({ email });

    if (alreadyExist) {
      return res
        .status(400)
        .json({ errors: ["This current e-mail address already taken."] });
    }

    const hashedPassword = await generateHashPassword(password);

    const new_user = await User.create({
      id: ulid(),
      name,
      email,
      password: hashedPassword,
      total_balance: 0,
      transactions: [],
    });

    if (!new_user)
      return res
        .status(400)
        .json({ error: ["This current user already exists."] });

    return res.status(201).json({ user: new_user });
  }

  static async getUser(req, res) {
    const current_user = req.user;

    const user = await User.findById(current_user._id).select("-password");

    const userTransactions = await Transaction.find({
      userId: current_user._id,
    });

    user.total_balance = await calculateAmount(userTransactions);

    await user.save();

    return res.status(200).json(user);
  }

  static async singInUser(req, res) {
    const { email, password } = req.body;

    const has_user = await User.findOne({ email });

    if (!has_user) {
      return res.status(404).json({ errors: ["User not found."] });
    }

    const passwordMatch = bcrypt.compare(password, has_user.password);

    if (!passwordMatch) {
      return res.status(401).json({ errors: ["Wrong password"] });
    }

    const token = jwt.sign({ id: has_user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ has_user, token });
  }

  static async update(req, res) {
    const current_user = req.user;

    const { name, password } = req.body;

    const user = await User.findById(current_user._id).select("-password");

    if (!user) return res.status(404).json({ errors: ["User not found."] });

    if (name) user.name = name;

    if (password) {
      const hashedPassword = await generateHashPassword(password);
      user.password = hashedPassword;
    }

    return res.status(200).json(user);
  }
}
