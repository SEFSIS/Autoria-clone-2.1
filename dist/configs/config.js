"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.configs = {
    DB_URI: process.env.DB_URI ||
        "mongodb+srv://sofiia:soffiia1@autoria-clone.yqv2ovh.mongodb.net/",
    PORT: process.env.PORT || 5050,
    FRONT_URL: process.env.FRONT_URL || "http://0.0.0.0:3000",
    SECRET_SALT: process.env.SECRET_SALT,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,
    JWT_FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,
};
