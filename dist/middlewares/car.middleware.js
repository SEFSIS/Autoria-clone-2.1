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
    checkForBadWords(req, res, next) {
        try {
            const badWordsFilter = new bad_words_1.default();
            for (const key in req.body) {
                if (typeof req.body[key] === "string") {
                    const text = req.body[key];
                    if (badWordsFilter.isProfane(text)) {
                        throw new api_error_1.ApiError("The use of profanity is prohibited, idiot!", 400);
                    }
                }
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carMiddleware = new CarMiddleware();
