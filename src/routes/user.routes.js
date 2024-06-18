import { Router } from "express";
import {
  createUser,
  getUser,
  signInUser,
  update,
} from "../controllers/users.controllers.js";
import { handleAuth } from "../middlewares/handleAuth.js";

const router = Router();

router.post("/", (req, res) => {
  return createUser(req, res);
});

router.post("/signin", (req, res) => {
  return signInUser(req, res);
});

router.get("/me", handleAuth, (req, res) => {
  return getUser(req, res);
});

router.patch("/", handleAuth, (req, res) => update(req, res));

export default router;
