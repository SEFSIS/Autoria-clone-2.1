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
            await car_service_1.carService.incrementViews(car._id);
            res.json(car);
        }
        catch (e) {
            next(e);
        }
    }
    async getAllPopular(req, res, next) {
        try {
            const cars = await car_service_1.carService.getMostViewedCars();
            return res.json(cars);
        }
        catch (e) {
            next(e);
        }
    }
    async getAveragePriceByCity(req, res, next) {
        try {
            const city = req.params.city;
            const averagePrice = await car_service_1.carService.getAveragePriceByCity(city);
            return res.json(averagePrice);
        }
        catch (error) {
            next(error);
        }
    }
    async getAverageCarPrice(req, res, next) {
        try {
            const averagePrice = await car_service_1.carService.getAverageCarPrice();
            res.json({ averagePrice });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.carController = new CarController();
