"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const brand_enum_1 = require("../enums/brand.enum");
const city_enum_1 = require("../enums/city.enum");
const status_enum_1 = require("../enums/status.enum");
const User_model_1 = require("./User.model");
const carSchema = new mongoose_1.Schema({
    brand: {
        type: String,
        enum: brand_enum_1.EBrand,
        required: true,
    },
    modelka: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    number_of_owners: {
        type: Number,
        required: true,
    },
    insurance: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: status_enum_1.EStatus,
        default: status_enum_1.EStatus.active,
    },
    city: {
        type: String,
        enum: Object.keys(city_enum_1.ECity),
        required: true,
    },
    _userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: User_model_1.User,
    },
    views: { type: Number, default: 0 },
    lastViewedAt: { type: Date, default: Date.now },
    dailyViews: { type: Number, default: 0 },
    monthlyViews: { type: Number, default: 0 },
    yearlyViews: { type: Number, default: 0 },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Car = (0, mongoose_1.model)("car", carSchema);
