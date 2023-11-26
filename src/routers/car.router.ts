import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { carMiddleware } from "../middlewares/car.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";
import { CarValidator } from "../validators/car.validator";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, carController.getAll);

router.get(
  "/popular",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPremium,
  carController.getAllPopular,
);

router.get(
  "/average-price",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPremium,
  carController.getAverageCarPrice,
);

router.get(
  "/average-price/:city",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPremium,
  carController.getAveragePriceByCity,
);
router.post(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.checkUserOnly,
  commonMiddleware.isBodyValid(CarValidator.create),
  carController.createCar,
);

router.get(
  "/:carId",
  authMiddleware.checkAccessToken,
  authMiddleware.checkPremium,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.getById,
);
router.put(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.update),
  carController.updateCar,
);
router.delete(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carController.deleteCar,
);

router.post(
  "/:carId/avatar",
  authMiddleware.checkAccessToken,
  fileMiddleware.isAvatarValid,
  carController.uploadAvatar,
);

export const carRouter = router;
