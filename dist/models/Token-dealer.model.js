"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTokenPremium = exports.TokenDealer = void 0;
const mongoose_1 = require("mongoose");
const Dealer_model_1 = require("./Dealer.model");
const tokensDealerSchema = new mongoose_1.Schema({
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    _dealerId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: Dealer_model_1.Dealer,
    },
}, { timestamps: true, versionKey: false });
exports.TokenDealer = (0, mongoose_1.model)("token-dealer", tokensDealerSchema);
const newTokensDealerSchema = new mongoose_1.Schema({
    newAccessToken: {
        type: String,
        required: true,
    },
    _dealerId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: Dealer_model_1.Dealer,
    },
}, { timestamps: true, versionKey: false });
exports.NewTokenPremium = (0, mongoose_1.model)("token-premium", newTokensDealerSchema);
