"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
const express_1 = require("express");
const car_controller_1 = require("../controllers/car.controller");
const auth_admin_middleware_1 = require("../middlewares/auth-admin.middleware");
const auth_dealer_middleware_1 = require("../middlewares/auth-dealer.middleware");
const auth_manager_middleware_1 = require("../middlewares/auth-manager.middleware");
const car_middleware_1 = require("../middlewares/car.middleware");
const common_middleware_1 = require("../middlewares/common.middleware");
const car_validator_1 = require("../validators/car.validator");
const router = (0, express_1.Router)();
router.get("/", car_controller_1.carController.getAll);
router.post("/", auth_dealer_middleware_1.authDealerMiddleware.checkAccessToken, common_middleware_1.commonMiddleware.isBodyValid(car_validator_1.CarValidator.create), car_controller_1.carController.createCar);
router.get("/:carId", common_middleware_1.commonMiddleware.isIdValid("carId"), car_middleware_1.carMiddleware.getByIdOrThrow, car_controller_1.carController.getById);
router.put("/:carId", (req, res, next) => {
    auth_dealer_middleware_1.authDealerMiddleware.checkAccessToken(req, res, (err) => {
        if (!err)
            return next();
        auth_manager_middleware_1.authManagerMiddleware.checkAccessToken(req, res, (err) => {
            if (!err)
                return next();
            auth_admin_middleware_1.authAdminMiddleware.checkAccessToken(req, res, next);
        });
    });
}, common_middleware_1.commonMiddleware.isIdValid("carId"), common_middleware_1.commonMiddleware.isBodyValid(car_validator_1.CarValidator.update), car_controller_1.carController.updateCar);
router.delete("/:carId", (req, res, next) => {
    auth_dealer_middleware_1.authDealerMiddleware.checkAccessToken(req, res, (err) => {
        if (!err)
            return next();
        auth_manager_middleware_1.authManagerMiddleware.checkAccessToken(req, res, (err) => {
            if (!err)
                return next();
            auth_admin_middleware_1.authAdminMiddleware.checkAccessToken(req, res, next);
        });
    });
}, auth_dealer_middleware_1.authDealerMiddleware.checkAccessToken, common_middleware_1.commonMiddleware.isIdValid("carId"), car_controller_1.carController.deleteCar);
exports.carRouter = router;
