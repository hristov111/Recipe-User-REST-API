import Router from "express";
import {
  getUserByIdController,
  getUsersController,
  createUserController,
  deleteUserController,
  loginUserController,
  logOutUserController,
  partiallyUpdateUserController,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createUserValidator,
  loginUserUserValidator,
} from "../validations/users.validation";

import { validateRequest } from "../middleware/validate.middleware";
import { refreshController } from "../controllers/token.controller";

const router = Router();

//you need to be admin
router.get("/", getUsersController);
// for this you need to be signed
router.get("/refreshAccessToken", refreshController);
router.post(
  "/register",
  createUserValidator,
  validateRequest,
  createUserController
);
router.post(
  "/login",
  loginUserUserValidator,
  validateRequest,
  loginUserController
);

router.patch("/patchUser", authMiddleware, partiallyUpdateUserController);

router.get("/getUserById", authMiddleware, getUserByIdController);
router.delete("/:id", authMiddleware, deleteUserController);
router.post("/logout", logOutUserController);
export default router;
