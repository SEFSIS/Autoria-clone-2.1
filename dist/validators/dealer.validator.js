"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealerValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const regex_constant_1 = require("../constants/regex.constant");
const city_enum_1 = require("../enums/city.enum");
const gender_enum_1 = require("../enums/gender.enum");
class DealerValidator {
}
exports.DealerValidator = DealerValidator;
_a = DealerValidator;
DealerValidator.firstName = joi_1.default.string().min(3).max(20).trim();
DealerValidator.surname = joi_1.default.string().min(3).max(20).trim();
DealerValidator.age = joi_1.default.number().min(18).max(150);
DealerValidator.gender = joi_1.default.valid(...Object.values(gender_enum_1.EGenders));
DealerValidator.phone = joi_1.default.string().regex(regex_constant_1.regexConstant.PHONE);
DealerValidator.email = joi_1.default
    .string()
    .regex(regex_constant_1.regexConstant.EMAIL)
    .trim()
    .messages({ "string.empty": "Email is not valid" });
DealerValidator.sole_trader = joi_1.default.boolean().truthy("yes").falsy("no").sensitive(false);
DealerValidator.vat_id = joi_1.default.string().regex(regex_constant_1.regexConstant.VAT_ID);
DealerValidator.city = joi_1.default.valid(...Object.values(city_enum_1.ECity));
DealerValidator.password = joi_1.default.string().regex(regex_constant_1.regexConstant.PASSWORD).trim();
DealerValidator.update = joi_1.default.object({
    age: _a.age,
    gender: _a.gender,
    city: _a.city,
    phone: _a.phone,
    email: _a.email,
    sole_trader: _a.sole_trader,
});
DealerValidator.register = joi_1.default.object({
    name: _a.firstName.required(),
    surname: _a.surname.required(),
    age: _a.age.required(),
    gender: _a.gender.required(),
    email: _a.email.required(),
    password: _a.password.required(),
    city: _a.city.required(),
    phone: _a.phone.required(),
    vat_id: _a.vat_id.required(),
    sole_trader: _a.sole_trader.required(),
});
DealerValidator.login = joi_1.default.object({
    email: _a.email.required(),
    password: _a.password.required(),
});
