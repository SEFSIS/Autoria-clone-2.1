"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const regex_constant_1 = require("../constants/regex.constant");
const gender_enum_1 = require("../enums/gender.enum");
class AdminValidator {
}
exports.AdminValidator = AdminValidator;
_a = AdminValidator;
AdminValidator.firstName = joi_1.default.string().min(3).max(20).trim();
AdminValidator.surname = joi_1.default.string().min(3).max(20).trim();
AdminValidator.age = joi_1.default.number().min(18).max(150);
AdminValidator.gender = joi_1.default.valid(...Object.values(gender_enum_1.EGenders));
AdminValidator.phone = joi_1.default.string().regex(regex_constant_1.regexConstant.PHONE);
AdminValidator.email = joi_1.default
    .string()
    .regex(regex_constant_1.regexConstant.EMAIL)
    .trim()
    .messages({ "string.empty": "Email is not valid" });
AdminValidator.partnership = joi_1.default.boolean().truthy("yes").falsy("no").sensitive(false);
AdminValidator.password = joi_1.default.string().regex(regex_constant_1.regexConstant.PASSWORD).trim();
AdminValidator.create = joi_1.default.object({
    name: _a.firstName,
    surname: _a.surname,
    age: _a.age,
    gender: _a.gender,
    phone: _a.phone,
    email: _a.email,
    partnership: _a.partnership,
    password: _a.password.required(),
});
AdminValidator.update = joi_1.default.object({
    age: _a.age,
    gender: _a.gender,
    phone: _a.phone,
    email: _a.email,
    partnership: _a.partnership,
});
