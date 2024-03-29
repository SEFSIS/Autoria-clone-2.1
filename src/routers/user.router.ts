import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.checkUserRole,
  userController.getAll,
);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);

router.post(
  "/create-manager",
  authMiddleware.checkAccessToken,
  authMiddleware.checkAdminOnly,
  commonMiddleware.isBodyValid(UserValidator.register),
  userMiddleware.isEmailUniq,
  authController.register,
);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById,
);
router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  authMiddleware.checkUserRole,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.updateUser,
);
router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  authMiddleware.checkUserRole,
  commonMiddleware.isIdValid("userId"),
  userController.deleteUser,
);

export const userRouter = router;
