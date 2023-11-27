"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carMiddleware = void 0;
const bad_words_1 = __importDefault(require("bad-words"));
const api_error_1 = require("../errors/api.error");
const car_repository_1 = require("../repositories/car.repository");
class CarMiddleware {
    constructor() {
        this.badWordsFilter = new bad_words_1.default();
        this.editAttemptsMap = new Map();
        this.maxEditAttempts = 3;
    }
    async getByIdOrThrow(req, res, next) {
        try {
            const { carId } = req.params;
            const car = await car_repository_1.carRepository.findById(carId);
            if (!car) {
                throw new api_error_1.ApiError("Car not found", 404);
            }
            req.res.locals = car;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    isCarBodyValid(validator) {
        return async (req, res, next) => {
            try {
                const { error, value } = validator.validate(req.body);
                await this.checkForBadWords(req.body);
                if (error) {
                    throw new api_error_1.ApiError(error.message, 400);
                }
                req.body = value;
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    async checkForBadWords(data) {
        if (typeof data === "object") {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    await this.checkForBadWords(data[key]);
                }
            }
        }
        else if (typeof data === "string") {
            if (this.badWordsFilter.isProfane(data)) {
                const userId = "exampleUserId";
                const editAttempts = this.getEditAttempts(userId);
                if (editAttempts < this.maxEditAttempts) {
                    this.incrementEditAttempts(userId);
                    throw new api_error_1.ApiError("Do not use foul language! Вам залишилося редагувань: " +
                        (this.maxEditAttempts - editAttempts), 400);
                }
                else {
                    throw new api_error_1.ApiError("Do not use foul language! Ви вичерпали ліміт редагувань.", 400);
                }
            }
        }
    }
    incrementEditAttempts(userId) {
        const currentAttempts = this.getEditAttempts(userId);
        this.editAttemptsMap.set(userId, currentAttempts + 1);
    }
    getEditAttempts(userId) {
        return this.editAttemptsMap.get(userId) || 0;
    }
}
exports.carMiddleware = new CarMiddleware();
