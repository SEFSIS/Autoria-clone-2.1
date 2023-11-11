import { Router } from "express";

import { authAdminController } from "../controllers/auth-admin.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AdminValidator } from "../validators/admin.validator";

const router = Router();

router.post(
  "/register-admin",
  commonMiddleware.isBodyValid(AdminValidator.register),
  authAdminController.register,
);
router.post("/login-admin", authAdminController.login);

export const authAdminRouter = router;
