import jwt from "jsonwebtoken";
import { users } from "../controllers/users.controllers.js";

export const handleAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const bearer = authHeader && authHeader.split(" ")[1];

  if (!bearer) {
    return res.status(401).json({ errors: ["Not authorized"] });
  }

  try {
    const is_valid = await jwt.verify(bearer, "janela");

    const user = await users.find((user) => user.id === is_valid.id);

    if (!user) return res.status(401).json({ errors: ["Not authorized"] });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ errors: ["Invalid token"] });
  }
};
