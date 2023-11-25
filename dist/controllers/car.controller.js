"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carController = void 0;
const car_service_1 = require("../services/car.service");
class CarController {
    async getAll(req, res, next) {
        try {
            const cars = await car_service_1.carService.getAll();
            return res.json(cars);
        }
        catch (e) {
            next(e);
        }
    }
    async createCar(req, res, next) {
        try {
            const { userId } = req.res.locals.tokenPayload;
            const car = await car_service_1.carService.createCar(req.body, userId);
            res.status(201).json(car);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteCar(req, res, next) {
        try {
            const { userId } = req.res.locals.tokenPayload;
            await car_service_1.carService.deleteCar(req.params.carId, userId);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async updateCar(req, res, next) {
        try {
            const { userId } = req.res.locals.tokenPayload;
            const car = await car_service_1.carService.updateCar(req.params.carId, req.body, userId);
            res.status(201).json(car);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const car = req.res.locals;
            res.json(car);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carController = new CarController();
