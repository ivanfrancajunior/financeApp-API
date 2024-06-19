import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const handleAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const bearer = authHeader && authHeader.split(" ")[1];

  if (!bearer) {
    return res.status(401).json({ errors: ["Not authorized"] });
  }

  try {
    const is_valid = jwt.verify(bearer, JWT_SECRET);

    const user = await User.findById(is_valid.id);

    if (!user) return res.status(401).json({ errors: ["Not authorized"] });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ errors: ["Invalid token"] });
  }
};
