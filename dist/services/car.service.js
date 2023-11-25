"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const role_enum_1 = require("../enums/role.enum");
const api_error_1 = require("../errors/api.error");
const car_repository_1 = require("../repositories/car.repository");
const user_repository_1 = require("../repositories/user.repository");
class CarService {
    async getAll() {
        return await car_repository_1.carRepository.getAll();
    }
    async createCar(dto, userId) {
        return await car_repository_1.carRepository.createCar(dto, userId);
    }
    async updateCar(carId, dto, userId) {
        await this.checkAbilityToManage(userId, carId);
        return await car_repository_1.carRepository.updateCar(carId, dto);
    }
    async deleteCar(carId, userId) {
        await this.checkAbilityToManage(userId, carId);
        await car_repository_1.carRepository.deleteCar(carId);
    }
    async checkAbilityToManage(userId, manageCarId) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new api_error_1.ApiError("User not found", 404);
        }
        if (user.role === role_enum_1.ERoles.Manager || user.role === role_enum_1.ERoles.Admin) {
            return await car_repository_1.carRepository.findById(manageCarId);
        }
        return await car_repository_1.carRepository.getOneByParams({
            _userId: userId,
            _id: manageCarId,
        });
    }
    async incrementViews(carId) {
        await car_repository_1.carRepository.incrementViews(carId);
    }
    async getMostViewedCars() {
        try {
            const mostViewedCars = await (await car_repository_1.carRepository.getAll()).sort((a, b) => b.views - a.views);
            return mostViewedCars;
        }
        catch (error) {
            console.error("Error getting most viewed cars:", error);
            return [];
        }
    }
    async getAveragePriceByCity(city) {
        try {
            const carsInCity = await car_repository_1.carRepository.getAllByCity(city);
            const prices = carsInCity.map((car) => car.price || 0);
            const totalPrices = prices.reduce((acc, price) => acc + price, 0);
            const averagePrice = totalPrices / prices.length;
            return averagePrice;
        }
        catch (error) {
            console.error("Error calculating average price by city:", error);
            throw new Error("Unable to calculate average price.");
        }
    }
    async getAverageCarPrice() {
        try {
            const cars = await car_repository_1.carRepository.getAll();
            const prices = cars.map((car) => car.price || 0);
            const totalPrices = prices.reduce((acc, price) => acc + price, 0);
            const averagePrice = totalPrices / prices.length;
            return averagePrice;
        }
        catch (error) {
            console.error("Error calculating average car price:", error);
            throw new Error("Unable to calculate average car price.");
        }
    }
}
exports.carService = new CarService();
