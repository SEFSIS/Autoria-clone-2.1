import { Router } from "express";

import { managerController } from "../controllers/manager.controller";
import { authAdminMiddleware } from "../middlewares/auth-admin.middleware";
import { authManagerMiddleware } from "../middlewares/auth-manager.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { managerMiddleware } from "../middlewares/manager.middleware";
import { ManagerValidator } from "../validators/manager.validator";

const router = Router();
router.get("/", authAdminMiddleware.checkAccessToken, managerController.getAll);
router.get(
  "/me",
  authManagerMiddleware.checkAccessToken,
  managerController.getMe,
);
router.get(
  "/:managerId",
  authAdminMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("managerId"),
  managerMiddleware.getByIdOrThrow,
  managerController.getById,
);
router.put(
  "/:managerId",
  authAdminMiddleware.checkAccessToken,
  authManagerMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("managerId"),
  commonMiddleware.isBodyValid(ManagerValidator.update),
  managerController.updateManager,
);
router.delete(
  "/:managerId",
  authAdminMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("managerId"),
  managerController.deleteManager,
);
export const managerRouter = router;
