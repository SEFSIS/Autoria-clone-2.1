import { Router } from "express";

import { adminController } from "../controllers/admin.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { authAdminMiddleware } from "../middlewares/auth-admin.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AdminValidator } from "../validators/admin.validator";

const router = Router();
router.get("/", authAdminMiddleware.checkAccessToken, adminController.getAll);
router.get("/me", authAdminMiddleware.checkAccessToken, adminController.getMe);
router.get(
  "/:adminId",
  authAdminMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("adminId"),
  adminMiddleware.getByIdOrThrow,
  adminController.getById,
);
router.put(
  "/:adminId",
  authAdminMiddleware.checkAccessToken,
  authAdminMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("adminId"),
  commonMiddleware.isBodyValid(AdminValidator.update),
  adminController.updateAdmin,
);
router.delete(
  "/:adminId",
  authAdminMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("adminId"),
  adminController.deleteAdmin,
);
export const adminRouter = router;
