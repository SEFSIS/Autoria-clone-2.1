"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const regex_constant_1 = require("../constants/regex.constant");
const gender_enum_1 = require("../enums/gender.enum");
class ManagerValidator {
}
exports.ManagerValidator = ManagerValidator;
_a = ManagerValidator;
ManagerValidator.firstName = joi_1.default.string().min(3).max(20).trim();
ManagerValidator.surname = joi_1.default.string().min(3).max(20).trim();
ManagerValidator.age = joi_1.default.number().min(18).max(150);
ManagerValidator.gender = joi_1.default.valid(...Object.values(gender_enum_1.EGenders));
ManagerValidator.phone = joi_1.default.string().regex(regex_constant_1.regexConstant.PHONE);
ManagerValidator.email = joi_1.default
    .string()
    .regex(regex_constant_1.regexConstant.EMAIL)
    .trim()
    .messages({ "string.empty": "Email is not valid" });
ManagerValidator.education = joi_1.default.string().min(3).max(20).trim();
ManagerValidator.experience = joi_1.default.string().min(3).max(20).trim();
ManagerValidator.password = joi_1.default.string().regex(regex_constant_1.regexConstant.PASSWORD).trim();
ManagerValidator.register = joi_1.default.object({
    name: _a.firstName.required(),
    surname: _a.surname.required(),
    age: _a.age.required(),
    gender: _a.gender.required(),
    phone: _a.phone.required(),
    email: _a.email.required(),
    education: _a.education.required(),
    experience: _a.experience.required(),
    password: _a.password.required(),
});
ManagerValidator.update = joi_1.default.object({
    age: _a.age,
    gender: _a.gender,
    phone: _a.phone,
    email: _a.email,
});
