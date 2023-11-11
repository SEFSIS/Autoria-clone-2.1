"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const api_error_1 = require("../errors/api.error");
const car_repository_1 = require("../repositories/car.repository");
class CarService {
    async getAll() {
        return await car_repository_1.carRepository.getAll();
    }
    async createCar(dto, dealerId) {
        return await car_repository_1.carRepository.createCar(dto, dealerId);
    }
    async updateCar(carId, dto, dealerId) {
        await this.checkAbilityToManage(dealerId, carId);
        return await car_repository_1.carRepository.updateCar(carId, dto);
    }
    async deleteCar(carId, dealerId) {
        await this.checkAbilityToManage(dealerId, carId);
        await car_repository_1.carRepository.deleteCar(carId);
    }
    async checkAbilityToManage(dealerId, manageCarId) {
        const car = await car_repository_1.carRepository.getOneByParams({
            _dealerId: dealerId,
            _id: manageCarId,
        });
        if (!car) {
            throw new api_error_1.ApiError("U can not manage this car", 403);
        }
        return car;
    }
    async getById(carId) {
        const car = await car_repository_1.carRepository.findById(carId);
        if (!car) {
            throw new api_error_1.ApiError("Car not found", 404);
        }
        await car_repository_1.carRepository.incrementViews(carId);
        return car;
    }
    async getAveragePriceByCity(city) {
        return await car_repository_1.carRepository.getAveragePriceByCity(city);
    }
    async getAveragePriceForAllCities() {
        return await car_repository_1.carRepository.getAveragePriceForAllCities();
    }
}
exports.carService = new CarService();
