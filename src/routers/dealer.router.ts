import { Router } from "express";

import { dealerController } from "../controllers/dealer.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { dealerMiddleware } from "../middlewares/dealer.middleware";
import { DealerValidator } from "../validators/dealer.validator";

const router = Router();
router.get("/", dealerController.getAll);
router.get(
  "/:dealerId",
  commonMiddleware.isIdValid("dealerId"),
  dealerMiddleware.getByIdOrThrow,
  dealerController.getById,
);
router.put(
  "/:dealerId",
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
