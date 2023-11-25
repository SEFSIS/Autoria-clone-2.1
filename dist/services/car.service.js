"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const api_error_1 = require("../errors/api.error");
const car_repository_1 = require("../repositories/car.repository");
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
        const car = await car_repository_1.carRepository.getOneByParams({
            _userId: userId,
            _id: manageCarId,
        });
        if (!car) {
            throw new api_error_1.ApiError("U can not manage this car", 403);
        }
        return car;
    }
}
exports.carService = new CarService();
