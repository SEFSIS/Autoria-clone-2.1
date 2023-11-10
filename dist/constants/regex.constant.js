"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexConstant = void 0;
exports.regexConstant = {
    EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/,
    PHONE: /^\+?3?8?(0\d{9})$/,
    VAT_ID: /^\d{10}$/,
};