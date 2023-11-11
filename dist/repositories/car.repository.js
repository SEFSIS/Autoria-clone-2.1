"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRepository = void 0;
const Car_model_1 = require("../models/Car.model");
class CarRepository {
    async getAll() {
        return await Car_model_1.Car.find().populate("_dealerId");
    }
    async getOneByParams(params) {
        return await Car_model_1.Car.findOne(params);
    }
    async findById(id) {
        return await Car_model_1.Car.findById(id);
    }
    async createCar(dto, dealerId) {
        return await (await Car_model_1.Car.create({ ...dto, _dealerId: dealerId })).populate("_dealerId");
    }
    async updateCar(carId, dto) {
        return await Car_model_1.Car.findByIdAndUpdate(carId, dto, {
            returnDocument: "after",
        }).populate("_dealerId");
    }
    async deleteCar(carId) {
        await Car_model_1.Car.deleteOne({ _id: carId });
    }
    async incrementViews(carId) {
        await Car_model_1.Car.updateOne({ _id: carId }, {
            $inc: {
                views: 1,
                dailyViews: 1,
                monthlyViews: 1,
                yearlyViews: 1,
            },
            lastViewedAt: new Date(),
        });
    }
    async getAveragePriceByCity(city) {
        const cars = await Car_model_1.Car.find({ city, price: { $gt: 0 } });
        if (cars.length === 0) {
            return 0;
        }
        const totalPrices = cars.reduce((total, car) => total + car.price, 0);
        const averagePrice = totalPrices / cars.length;
        return averagePrice || 0;
    }
    async getAveragePriceForAllCities() {
        const cars = await Car_model_1.Car.find({ price: { $gt: 0 } });
        if (cars.length === 0) {
            return 0;
        }
        const totalPrices = cars.reduce((total, car) => total + car.price, 0);
        const averagePrice = totalPrices / cars.length;
        return averagePrice || 0;
    }
}
exports.carRepository = new CarRepository();
