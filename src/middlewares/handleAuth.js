import jwt from "jsonwebtoken";
import { users } from "../controllers/users.controllers.js";

export const handleAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  console.log(req.headers);

  const bearer = authHeader && authHeader.split(" ")[1];

  if (!bearer) {
    return res.status(401).json({ errors: ["Not authorized"] });
  }

  try {
    const is_valid = await jwt.verify(bearer, "janela");

    req.user = await users.find((user) => user.id === is_valid.id);

    next();
  } catch (error) {
    return res.status(401).json({ errors: ["Invalid token"] });
  }
};
