import { Router } from "express";

import { authDealerController } from "../controllers/auth-dealer.controller";
import { authDealerMiddleware } from "../middlewares/auth-dealer.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { DealerValidator } from "../validators/dealer.validator";

const router = Router();

router.post(
  "/register-dealer",
  commonMiddleware.isBodyValid(DealerValidator.register),
  authDealerController.register,
);
router.post("/login-dealer", authDealerController.login);

router.post(
  "/refresh-dealer",
  authDealerMiddleware.checkRefreshToken,
  authDealerController.refresh,
);
export const authDealerRouter = router;
