import { ulid } from "ulid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// const JWT_SECRET = process.env.JWT_SECRET;
export const users = [
  {
    id: "01J0P6JD2405YNY7S1CKGAZ5P2",
    name: "Jota Apenas",
    email: "jota@email.com",
    password: "$2a$08$pyk.zVW4NbNBPkn2nJVf1OlEjd/pNMkO2S3uq/qpfMN9sTr5aRfhi",
    total_balance: 0,
    transactions: [],
  },
];

const generateHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(8);

  const hashed_password = await bcrypt.hash(password, salt);

  return hashed_password;
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const alreadyExist = users.find((user) => user.email === email);

  if (alreadyExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await generateHashPassword(password);

  const new_user = {
    id: ulid(),
    name,
    email,
    password: hashedPassword,
    total_balance: 0,
    transactions: [],
  };

  users.push(new_user);

  return res.status(201).json({ user: new_user });
};

export const getUser = async (req, res) => {
  const user = req.user;

  return res.status(200).json(user);
};

export const signInUser = async (req, res) => {
  const { email, password } = req.body;

  const has_user = await users.find((user) => user.email === email);

  if (!has_user) {
    return res.status(404).json({ message: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, has_user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = await jwt.sign({ id: has_user.id }, "janela", {
    expiresIn: "7d",
  });

  return res.status(200).json({ has_user, token });
};

export const update = async (req, res) => {
  const user = req.user;
  const { name, password } = req.body;

  if (!name & !password)
    return res.status(404).json({ message: "Bad request" });

  if (name) user.name = name;

  if (password) {
    const hashedPassword = await generateHashPassword(password);
    user.password = hashedPassword;
  }

  return res.status(200).json(user);
};
