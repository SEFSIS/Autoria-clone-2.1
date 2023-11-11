import { Router } from "express";

import { authAdminController } from "../controllers/auth-admin.controller";
import { authAdminMiddleware } from "../middlewares/auth-admin.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AdminValidator } from "../validators/admin.validator";

const router = Router();

router.post(
  "/register-admin",
  commonMiddleware.isBodyValid(AdminValidator.register),
  authAdminController.register,
);
router.post("/login-admin", authAdminController.login);

router.post(
  "/refresh-admin",
  authAdminMiddleware.checkRefreshToken,
  authAdminController.refresh,
);
export const authAdminRouter = router;
