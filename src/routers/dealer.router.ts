import { Router } from "express";

import { dealerController } from "../controllers/dealer.controller";
import { authDealerMiddleware } from "../middlewares/auth-dealer.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { dealerMiddleware } from "../middlewares/dealer.middleware";
import { DealerValidator } from "../validators/dealer.validator";

const router = Router();
router.get("/", dealerController.getAll);
router.get(
  "/me",
  authDealerMiddleware.checkAccessToken,
  dealerController.getMe,
);
router.get(
  "/:dealerId",
  commonMiddleware.isIdValid("dealerId"),
  dealerMiddleware.getByIdOrThrow,
  dealerController.getById,
);
router.put(
  "/:dealerId",
  authDealerMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("dealerId"),
  commonMiddleware.isBodyValid(DealerValidator.update),
  dealerController.updateDealer,
);
router.delete(
  "/:dealerId",
  commonMiddleware.isIdValid("dealerId"),
  dealerController.deleteDealer,
);
export const dealerRouter = router;
