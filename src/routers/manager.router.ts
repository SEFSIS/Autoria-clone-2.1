import { Router } from "express";

import { managerController } from "../controllers/manager.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { managerMiddleware } from "../middlewares/manager.middleware";
import { ManagerValidator } from "../validators/manager.validator";

const router = Router();
router.get("/", managerController.getAll);
router.post(
  "/",
  commonMiddleware.isBodyValid(ManagerValidator.create),
  managerController.createManager,
);
router.get(
  "/:managerId",
  commonMiddleware.isIdValid("managerId"),
  managerMiddleware.getByIdOrThrow,
  managerController.getById,
);
router.put(
  "/:managerId",
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
