import { Router } from "express";
import { UserController } from "../controllers/users.controllers.js";
import {
  createUserValidation,
  userSignInValidations,
  userUpdateValidation,
} from "../middlewares/user/userValidations.js";
import { handleAuth } from "../middlewares/handleAuth.js";
import { handleValidate } from "../middlewares/handleValidations.js";

const router = Router();

router.post(
  "/",
  createUserValidation(),
  handleValidate,
  UserController.createUser
);

router.post(
  "/signin",
  userSignInValidations(),
  handleValidate,
  UserController.singInUser
);

router.get("/me", handleAuth, UserController.getUser);

router.patch(
  "/",
  handleAuth,
  userUpdateValidation(),
  handleValidate,
  UserController.update
);

export default router;
