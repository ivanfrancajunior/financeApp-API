import { ulid } from "ulid";
import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;

const users = [];
export const createUser = async (req, res) => {
  const { name, email } = req.body;

  const alreadyExist = users.find((user) => user.email === email);

  if (alreadyExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const new_user = {
    id: ulid(),
    name,
    email,
    total_balance: 0,
    transactions: [],
  };
  const token = await jwt.sign({ id: new_user.id }, "janela", {
    expiresIn: "7d",
  });

  users.push(new_user);

  return res.status(201).json({ user: new_user, token });
};

export const getAllUsers = async (req, res) => {
  return res.status(200).json(users);
};
