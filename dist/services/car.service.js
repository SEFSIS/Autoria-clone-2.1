"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const brand_enum_1 = require("../enums/brand.enum");
const email_enum_1 = require("../enums/email.enum");
const api_error_1 = require("../errors/api.error");
const car_repository_1 = require("../repositories/car.repository");
const email_service_1 = require("./email.service");
const s3_service_1 = require("./s3.service");
class CarService {
    async getAll() {
        return await car_repository_1.carRepository.getAll();
    }
    async uploadAvatar(avatar, carId) {
        const car = await car_repository_1.carRepository.findById(carId);
        if (car.avatar) {
            await s3_service_1.s3Service.deleteFile(car.avatar);
        }
        const filePath = await s3_service_1.s3Service.uploadFile(avatar, s3_service_1.EFileTypes.Car, carId);
        const updatedCar = await car_repository_1.carRepository.updateOneById(carId, {
            avatar: filePath,
        });
        return updatedCar;
    }
    async createCar(dto, dealerId) {
        const existingCar = await car_repository_1.carRepository.getOneByParams({
            _dealerId: dealerId,
        });
        if (existingCar) {
            throw new Error("Дилер вже має створений автомобіль");
        }
        const { brand } = dto;
        const emailAction = email_enum_1.EEmailAction.NOTBRAND;
        const context = { message: "Такої моделі нема" };
        try {
            if (!Object.values(brand_enum_1.EBrand).includes(brand)) {
                await email_service_1.emailService.sendMail(emailAction, context);
            }
            return await car_repository_1.carRepository.createCar(dto, dealerId);
        }
        catch (error) {
            await email_service_1.emailService.sendMail(emailAction, context);
            throw error;
        }
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
}
exports.carService = new CarService();
