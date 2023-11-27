"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRepository = void 0;
const Car_model_1 = require("../models/Car.model");
class CarRepository {
    async getAll() {
        return await Car_model_1.Car.find().populate("_userId");
    }
    async getMany(query) {
        const queryStr = JSON.stringify(query);
        const queryObj = JSON.parse(queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`));
        const { page, limit, sortedBy, ...searchObject } = queryObj;
        const skip = +limit * (+page - 1);
        return await Promise.all([
            Car_model_1.Car.find(searchObject)
                .populate("_userId")
                .limit(+limit)
                .skip(skip)
                .sort(sortedBy),
            Car_model_1.Car.count(searchObject),
        ]);
    }
    async getOneByParams(params) {
        return await Car_model_1.Car.findOne(params);
    }
    async findById(id) {
        return await Car_model_1.Car.findById(id);
    }
    async createCar(dto, userId) {
        return await (await Car_model_1.Car.create({ ...dto, _userId: userId })).populate("_userId");
    }
    async updateCar(carId, dto) {
        return await Car_model_1.Car.findByIdAndUpdate(carId, dto, {
            returnDocument: "after",
        }).populate("_userId");
    }
    async deleteCar(carId) {
        await Car_model_1.Car.deleteOne({ _id: carId });
    }
    async incrementViews(carId) {
        const car = await Car_model_1.Car.findById(carId);
        const today = new Date();
        const lastViewedAt = car.lastViewedAt || today;
        const lastMonth = lastViewedAt.getMonth();
        const lastYear = lastViewedAt.getFullYear();
        const update = { $inc: { views: 1 } };
        if (!this.isSameDay(today, lastViewedAt)) {
            update.$set = { lastViewedAt: today, dailyViews: 1 };
        }
        else {
            update.$inc.dailyViews = 1;
        }
        if (today.getMonth() !== lastMonth) {
            update.$set.monthlyViews = 1;
        }
        else {
            update.$inc.monthlyViews = 1;
        }
        if (today.getFullYear() !== lastYear) {
            update.$set.yearlyViews = 1;
        }
        else {
            update.$inc.yearlyViews = 1;
        }
        await Car_model_1.Car.findByIdAndUpdate(carId, update);
    }
    isSameDay(date1, date2) {
        return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate());
    }
    async getAllByCity(city) {
        return await Car_model_1.Car.find({ city }).populate("_userId");
    }
    async updateOneById(carId, dto) {
        return await Car_model_1.Car.findByIdAndUpdate(carId, dto, {
            returnDocument: "after",
        }).populate("_userId");
    }
    async getCarsByUserId(userId) {
        try {
            const cars = await Car_model_1.Car.find({ _userId: userId });
            return cars;
        }
        catch (error) {
            console.error("Помилка при отриманні автомобілів за ідентифікатором користувача:", error);
            return [];
        }
    }
}
exports.carRepository = new CarRepository();
