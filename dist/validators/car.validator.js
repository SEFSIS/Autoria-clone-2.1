"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const brand_enum_1 = require("../enums/brand.enum");
const currentYear = new Date().getFullYear();
class CarValidator {
}
exports.CarValidator = CarValidator;
_a = CarValidator;
CarValidator.brand = joi_1.default.valid(...Object.values(brand_enum_1.EBrand));
CarValidator.modelka = joi_1.default.string().min(3).max(20).trim();
CarValidator.year = joi_1.default.number().min(1990).max(currentYear);
CarValidator.color = joi_1.default.string().min(3).max(20).trim();
CarValidator.number_of_owners = joi_1.default.number().min(1).max(5);
CarValidator.insurance = joi_1.default.boolean().truthy("yes").falsy("no").sensitive(false);
CarValidator.price = joi_1.default.number().min(1000).max(5000);
CarValidator.create = joi_1.default.object({
    brand: _a.brand.required(),
    modelka: _a.modelka.required(),
    year: _a.year.required(),
    color: _a.color.required(),
    number_of_owners: _a.number_of_owners.required(),
    insurance: _a.insurance.required(),
    price: _a.price.required(),
});
CarValidator.update = joi_1.default.object({
    modelka: _a.modelka,
    year: _a.year,
    color: _a.color,
    number_of_owners: _a.number_of_owners,
    insurance: _a.insurance,
    price: _a.price,
});