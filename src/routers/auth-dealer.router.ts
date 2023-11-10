import { Router } from "express";

import { authDealerController } from "../controllers/auth-dealer.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { DealerValidator } from "../validators/dealer.validator";

const router = Router();

router.post(
  "/register-dealer",
  commonMiddleware.isBodyValid(DealerValidator.register),
  authDealerController.register,
);
router.post("/login-dealer", authDealerController.login);

export const authDealerRouter = router;
