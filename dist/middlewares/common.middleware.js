"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = void 0;
const bad_words_1 = __importDefault(require("bad-words"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_error_1 = require("../errors/api.error");
class CommonMiddleware {
    constructor() {
        this.badWordsFilter = new bad_words_1.default();
        this.editAttemptsMap = new Map();
        this.maxEditAttempts = 3;
    }
    isIdValid(field) {
        return (req, res, next) => {
            try {
                const id = req.params[field];
                if (!mongoose_1.default.isObjectIdOrHexString(id)) {
                    throw new api_error_1.ApiError("Not valid ID", 400);
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    isBodyValid(validator) {
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
exports.commonMiddleware = new CommonMiddleware();
