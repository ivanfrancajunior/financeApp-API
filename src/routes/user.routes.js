import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/users.controllers.js";

const router = Router();

router.post("/", (req, res) => {
  return createUser(req, res);
});
router.get("/", (req, res) => {
  return getAllUsers(req, res);
});

export default router;
