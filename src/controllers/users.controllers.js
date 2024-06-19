import { ulid } from "ulid";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;

const generateHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(8);

  const hashed_password = await bcrypt.hash(password, salt);

  return hashed_password;
};

export const createUser = async (req, res) => {
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
      .status(422)
      .json({ error: ["This current user already exists."] });

  return res.status(201).json({ user: new_user });
};

export const getUser = async (req, res) => {
  const current_user = req.user;

  const user = await User.findById(current_user._id).select("-password");

  return res.status(200).json(user);
};

export const signInUser = async (req, res) => {
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
};

export const update = async (req, res) => {
  const current_user = req.user;

  const { name, password } = req.body;

  const user = await User.findById(current_user._id).select("-password");

  if (!user) return res.status(404).json({ errors: ["User not found."] });

  if (name) current_user.name = name;

  if (password) {
    const hashedPassword = await generateHashPassword(password);
    current_user.password = hashedPassword;
  }

  return res.status(200).json(user);
};
