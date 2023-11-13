import { Router } from "express";

import { carController } from "../controllers/car.controller";
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

router.get(
  "/average-price/all",
  //authPremiumMiddleware.checkAccessToken,
  carController.getAveragePriceForAllCities,
);
router.get(
  "/average-price/:city",
  //authPremiumMiddleware.checkAccessToken,
  carController.getAveragePriceByCity,
);
export const premiumRouter = router;
