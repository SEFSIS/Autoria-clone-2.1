import { Router } from "express";

import { dealerController } from "../controllers/dealer.controller";
import { authAdminMiddleware } from "../middlewares/auth-admin.middleware";
import { authDealerMiddleware } from "../middlewares/auth-dealer.middleware";
import { authManagerMiddleware } from "../middlewares/auth-manager.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { dealerMiddleware } from "../middlewares/dealer.middleware";
import { DealerValidator } from "../validators/dealer.validator";

const router = Router();
router.get(
  "/",
  (req, res, next) => {
    authManagerMiddleware.checkAccessToken(req, res, (err) => {
      if (!err) return next();

      authAdminMiddleware.checkAccessToken(req, res, next);
    });
  },
  dealerController.getAll,
);
router.get(
  "/me",
  authDealerMiddleware.checkAccessToken,
  dealerController.getMe,
);
router.get(
  "/:dealerId",
  (req, res, next) => {
    authManagerMiddleware.checkAccessToken(req, res, (err) => {
      if (!err) return next();

      authAdminMiddleware.checkAccessToken(req, res, next);
    });
  },
  commonMiddleware.isIdValid("dealerId"),
  dealerMiddleware.getByIdOrThrow,
  dealerController.getById,
);
router.put(
  "/:dealerId",
  (req, res, next) => {
    authManagerMiddleware.checkAccessToken(req, res, (err) => {
      if (!err) return next();

      authAdminMiddleware.checkAccessToken(req, res, next);
    });
  },
  authDealerMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("dealerId"),
  commonMiddleware.isBodyValid(DealerValidator.update),
  dealerController.updateDealer,
);
router.delete(
  "/:dealerId",
  (req, res, next) => {
    authManagerMiddleware.checkAccessToken(req, res, (err) => {
      if (!err) return next();

      authAdminMiddleware.checkAccessToken(req, res, next);
    });
  },
  commonMiddleware.isIdValid("dealerId"),
  dealerController.deleteDealer,
);
export const dealerRouter = router;
