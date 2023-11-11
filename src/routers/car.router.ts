import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { authDealerMiddleware } from "../middlewares/auth-dealer.middleware";
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
  authDealerMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.update),
  carController.updateCar,
);
router.delete(
  "/:carId",
  authDealerMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carController.deleteCar,
);
export const carRouter = router;
