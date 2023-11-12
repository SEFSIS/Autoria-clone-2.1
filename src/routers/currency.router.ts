import { Router } from "express";

import { currencyController } from "../controllers/currency.controller";
import { authClientMiddleware } from "../middlewares/auth-client.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CurrencyValidator } from "../validators/currency.validator";

const router = Router();
router.get("/", currencyController.getAll);
router.post(
  "/",
  authClientMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(CurrencyValidator.create),
  currencyController.createCurrency,
);

export const currencyRouter = router;
