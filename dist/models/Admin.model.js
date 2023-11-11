"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const gender_enum_1 = require("../enums/gender.enum");
const status_enum_1 = require("../enums/status.enum");
const adminSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    age: {
        type: Number,
        min: [1, "Minimum age is 1"],
        max: [199, "Maximum age is 199"],
    },
    gender: {
        type: String,
        enum: gender_enum_1.EGenders,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    partnership: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: status_enum_1.EStatus,
        required: true,
        default: status_enum_1.EStatus.active,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Admin = (0, mongoose_1.model)("admin", adminSchema);
