"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const car_repository_1 = require("../repositories/car.repository");
class CarService {
    async getAll() {
        return await car_repository_1.carRepository.getAll();
    }
    async createCar(dto) {
        return await car_repository_1.carRepository.createCar(dto);
    }
    async updateCar(carId, dto) {
        return await car_repository_1.carRepository.updateCar(carId, dto);
    }
    async deleteCar(carId) {
        await car_repository_1.carRepository.deleteCar(carId);
    }
}
exports.carService = new CarService();
