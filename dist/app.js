"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const config_1 = require("./configs/config");
const admin_router_1 = require("./routers/admin.router");
const auth_admin_router_1 = require("./routers/auth-admin.router");
const auth_client_router_1 = require("./routers/auth-client.router");
const auth_dealer_router_1 = require("./routers/auth-dealer.router");
const auth_manager_router_1 = require("./routers/auth-manager.router");
const car_router_1 = require("./routers/car.router");
const client_router_1 = require("./routers/client.router");
const dealer_router_1 = require("./routers/dealer.router");
const manager_router_1 = require("./routers/manager.router");
const premium_router_1 = require("./routers/premium.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/cars", car_router_1.carRouter);
app.use("/managers", manager_router_1.managerRouter);
app.use("/admins", admin_router_1.adminRouter);
app.use("/clients", client_router_1.clientRouter);
app.use("/dealers", dealer_router_1.dealerRouter);
app.use("/auth-dealer", auth_dealer_router_1.authDealerRouter);
app.use("/auth-client", auth_client_router_1.authClientRouter);
app.use("/auth-admin", auth_admin_router_1.authAdminRouter);
app.use("/auth-manager", auth_manager_router_1.authManagerRouter);
app.use("/premiums", premium_router_1.premiumRouter);
app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.status(status).json({
        message: error.message,
        status: error.status,
    });
});
app.listen(config_1.configs.PORT, async () => {
    await mongoose.connect(config_1.configs.DB_URI);
    console.log(`Server has successfully started on PORT ${config_1.configs.PORT}`);
});
