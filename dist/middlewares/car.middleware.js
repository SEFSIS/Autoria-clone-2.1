"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carMiddleware = void 0;
const api_error_1 = require("../errors/api.error");
const car_repository_1 = require("../repositories/car.repository");
class CarMiddleware {
    async getByIdOrThrow(req, res, next) {
        try {
            const { carId } = req.params;
            const car = await car_repository_1.carRepository.findById(carId);
            if (!car) {
                throw new api_error_1.ApiError("Car not found", 404);
            }
            req.res.locals = car;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carMiddleware = new CarMiddleware();
