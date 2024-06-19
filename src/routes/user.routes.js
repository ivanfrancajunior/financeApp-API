import { Router } from "express";
import {
  createUser,
  getUser,
  signInUser,
  update,
} from "../controllers/users.controllers.js";
import {
  createUserValidation,
  userSignInValidations,
  userUpdateValidation,
} from "../middlewares/user/userValidations.js";
import { handleAuth } from "../middlewares/handleAuth.js";
import { handleValidate } from "../middlewares/handleValidations.js";

const router = Router();

router.post("/", createUserValidation(), handleValidate, createUser);

router.post("/signin", userSignInValidations(), handleValidate, signInUser);

router.get("/me", handleAuth, getUser);

router.patch("/", handleAuth, userUpdateValidation(), handleValidate, update);

export default router;
