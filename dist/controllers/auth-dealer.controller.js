"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authDealerController = void 0;
const auth_dealer_service_1 = require("../services/auth-dealer.service");
class AuthDealerController {
    async register(req, res, next) {
        try {
            await auth_dealer_service_1.authDealerService.register(req.body);
            return res.sendStatus(201);
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const tokensDealerPair = await auth_dealer_service_1.authDealerService.login(req.body);
            return res.json(tokensDealerPair);
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const tokenPayload = req.res.locals.tokenPayload;
            const refreshToken = req.res.locals.refreshToken;
            const tokensPair = await auth_dealer_service_1.authDealerService.refresh(tokenPayload, refreshToken);
            return res.status(201).json(tokensPair);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authDealerController = new AuthDealerController();
