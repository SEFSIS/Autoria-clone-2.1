import { Router } from "express";

import { managerController } from "../controllers/manager.controller";
import { authManagerMiddleware } from "../middlewares/auth-manager.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { managerMiddleware } from "../middlewares/manager.middleware";
import { ManagerValidator } from "../validators/manager.validator";

const router = Router();
router.get("/", managerController.getAll);

router.get(
  "/:managerId",
  commonMiddleware.isIdValid("managerId"),
  managerMiddleware.getByIdOrThrow,
  managerController.getById,
);
router.put(
  "/:managerId",
  authManagerMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("managerId"),
  commonMiddleware.isBodyValid(ManagerValidator.update),
  managerController.updateManager,
);
router.delete(
  "/:managerId",
  commonMiddleware.isIdValid("managerId"),
  managerController.deleteManager,
);
export const managerRouter = router;
