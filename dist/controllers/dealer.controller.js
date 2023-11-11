"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealerController = void 0;
const dealer_service_1 = require("../services/dealer.service");
class DealerController {
    async getAll(req, res, next) {
        try {
            const dealers = await dealer_service_1.dealerService.getAll();
            return res.json(dealers);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const dealer = req.res.locals;
            res.json(dealer);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteDealer(req, res, next) {
        try {
            await dealer_service_1.dealerService.deleteDealer(req.params.dealerId);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async updateDealer(req, res, next) {
        try {
            const dealer = await dealer_service_1.dealerService.updateDealer(req.params.dealerId, req.body);
            res.status(201).json(dealer);
        }
        catch (e) {
            next(e);
        }
    }
    async getMe(req, res, next) {
        try {
            const { dealerId } = req.res.locals.tokenPayload;
            const dealer = await dealer_service_1.dealerService.getMe(dealerId);
            res.json(dealer);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.dealerController = new DealerController();
