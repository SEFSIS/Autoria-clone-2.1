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
            const { dealerId } = req.res.locals.tokenPayload;
            const car = await car_service_1.carService.createCar(req.body, dealerId);
            res.status(201).json(car);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteCar(req, res, next) {
        try {
            const { dealerId } = req.res.locals.tokenPayload;
            await car_service_1.carService.deleteCar(req.params.carId, dealerId);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async updateCar(req, res, next) {
        try {
            const { dealerId } = req.res.locals.tokenPayload;
            const car = await car_service_1.carService.updateCar(req.params.carId, req.body, dealerId);
            res.status(201).json(car);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const car = await car_service_1.carService.getById(req.params.carId);
            res.json(car);
        }
        catch (e) {
            next(e);
        }
    }
    async getAveragePriceByCity(req, res, next) {
        try {
            const { city } = req.params;
            const averagePrice = await car_service_1.carService.getAveragePriceByCity(city);
            res.json({ averagePrice });
        }
        catch (e) {
            next(e);
        }
    }
    async getAveragePriceForAllCities(req, res, next) {
        try {
            const averagePrice = await car_service_1.carService.getAveragePriceForAllCities();
            res.json({ averagePrice });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carController = new CarController();
