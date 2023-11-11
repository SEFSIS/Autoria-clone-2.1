import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { authAdminMiddleware } from "../middlewares/auth-admin.middleware";
import { authDealerMiddleware } from "../middlewares/auth-dealer.middleware";
import { authManagerMiddleware } from "../middlewares/auth-manager.middleware";
import { carMiddleware } from "../middlewares/car.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CarValidator } from "../validators/car.validator";

const router = Router();
router.get("/", carController.getAll);
router.post(
  "/",
  authDealerMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(CarValidator.create),
  carController.createCar,
);
router.get(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.getById,
);
router.put(
  "/:carId",
  (req, res, next) => {
    authDealerMiddleware.checkAccessToken(req, res, (err) => {
      if (!err) return next();

      authManagerMiddleware.checkAccessToken(req, res, (err) => {
        if (!err) return next();

        authAdminMiddleware.checkAccessToken(req, res, next);
      });
    });
  },
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.update),
  carController.updateCar,
);
router.delete(
  "/:carId",
  (req, res, next) => {
    authDealerMiddleware.checkAccessToken(req, res, (err) => {
      if (!err) return next();

      authManagerMiddleware.checkAccessToken(req, res, (err) => {
        if (!err) return next();

        authAdminMiddleware.checkAccessToken(req, res, next);
      });
    });
  },
  authDealerMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carController.deleteCar,
);
export const carRouter = router;
