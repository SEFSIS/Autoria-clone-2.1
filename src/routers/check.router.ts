import { Router } from "express";

import { checkController } from "../controllers/check.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CheckValidator } from "../validators/check.validator";

const router = Router();

router.get("/", checkController.getAll);
router.post(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(CheckValidator.create),
  checkController.createCheck,
);

export const checkRouter = router;
