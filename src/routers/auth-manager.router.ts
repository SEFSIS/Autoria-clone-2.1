import { Router } from "express";

import { authManagerController } from "../controllers/auth-manager.controller";
import { authManagerMiddleware } from "../middlewares/auth-manager.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ManagerValidator } from "../validators/manager.validator";

const router = Router();

router.post(
  "/register-manager",
  commonMiddleware.isBodyValid(ManagerValidator.register),
  authManagerController.register,
);
router.post("/login-manager", authManagerController.login);

router.post(
  "/refresh-manager",
  authManagerMiddleware.checkRefreshToken,
  authManagerController.refresh,
);

export const authManagerRouter = router;
