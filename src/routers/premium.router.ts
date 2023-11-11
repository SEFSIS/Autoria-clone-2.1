import { Router } from "express";

import { premiumController } from "../controllers/premium.controller";
import { authDealerMiddleware } from "../middlewares/auth-dealer.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { PremiumValidator } from "../validators/premium.validator";

const router = Router();
router.get("/", premiumController.getAll);
router.post(
  "/",
  authDealerMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(PremiumValidator.create),
  premiumController.createPremium,
);
export const premiumRouter = router;
