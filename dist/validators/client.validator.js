"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const regex_constant_1 = require("../constants/regex.constant");
const city_enum_1 = require("../enums/city.enum");
const gender_enum_1 = require("../enums/gender.enum");
class ClientValidator {
}
exports.ClientValidator = ClientValidator;
_a = ClientValidator;
ClientValidator.firstName = joi_1.default.string().min(3).max(20).trim();
ClientValidator.surname = joi_1.default.string().min(3).max(20).trim();
ClientValidator.age = joi_1.default.number().min(18).max(150);
ClientValidator.gender = joi_1.default.valid(...Object.values(gender_enum_1.EGenders));
ClientValidator.phone = joi_1.default.string().regex(regex_constant_1.regexConstant.PHONE);
ClientValidator.email = joi_1.default
    .string()
    .regex(regex_constant_1.regexConstant.EMAIL)
    .trim()
    .messages({ "string.empty": "Email is not valid" });
ClientValidator.city = joi_1.default.valid(...Object.values(city_enum_1.ECity));
ClientValidator.password = joi_1.default.string().regex(regex_constant_1.regexConstant.PASSWORD).trim();
ClientValidator.update = joi_1.default.object({
    age: _a.age,
    gender: _a.gender,
    phone: _a.phone,
    email: _a.email,
    city: _a.city,
});
ClientValidator.register = joi_1.default.object({
    name: _a.firstName,
    surname: _a.surname,
    age: _a.age,
    gender: _a.gender,
    phone: _a.phone,
    email: _a.email,
    city: _a.city,
    password: _a.password,
});
