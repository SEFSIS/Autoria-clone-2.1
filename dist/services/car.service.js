"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const bad_words_1 = __importDefault(require("bad-words"));
const car_status_enum_1 = require("../enums/car.status.enum");
const email_action_enum_1 = require("../enums/email.action.enum");
const role_enum_1 = require("../enums/role.enum");
const status_enum_1 = require("../enums/status.enum");
const api_error_1 = require("../errors/api.error");
const car_repository_1 = require("../repositories/car.repository");
const user_repository_1 = require("../repositories/user.repository");
const email_service_1 = require("./email.service");
const s3_service_1 = require("./s3.service");
class CarService {
    async getAllWithPagination(query) {
        try {
            const [cars, itemsFound] = await car_repository_1.carRepository.getMany(query);
            return {
                page: +query.page || 1,
                limit: +query.limit || 5,
                itemsFound,
                data: cars,
            };
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
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
    async createCar(dto, userId) {
        const userStatus = await this.getUserStatus(userId);
        if (userStatus !== status_enum_1.EStatus.premium) {
            const userCarCount = await this.getUserCarCount(userId);
            if (userCarCount >= 1) {
                throw new api_error_1.ApiError("You cannot create more than 1 car", 403);
            }
        }
        await this.checkForBadWordsInCar(dto);
        return await car_repository_1.carRepository.createCar(dto, userId);
    }
    async getUserCarCount(userId) {
        try {
            const userCars = await car_repository_1.carRepository.getCarsByUserId(userId);
            return userCars.length;
        }
        catch (error) {
            console.error("Помилка при отриманні кількості автомобілів користувача:", error);
            return 0;
        }
    }
    async getUserStatus(userId) {
        const user = await user_repository_1.userRepository.findById(userId);
        return user?.status || status_enum_1.EStatus.base;
    }
    async checkForBadWordsInCar(car) {
        const badWordsFilter = new bad_words_1.default();
        const fieldsToCheck = [
            "brand",
            "modelka",
            "color",
            "number_of_owners",
            "insurance",
            "price",
            "city",
        ];
        for (const field of fieldsToCheck) {
            if (car[field] &&
                typeof car[field] === "string" &&
                badWordsFilter.isProfane(car[field])) {
                car.status = car_status_enum_1.ECarStatus.inactive;
                await email_service_1.emailService.sendCustomMail("sofinblack11@gmail.com", email_action_enum_1.EEmailAction.INACTIVE, car);
                break;
            }
        }
    }
}
exports.carService = new CarService();
