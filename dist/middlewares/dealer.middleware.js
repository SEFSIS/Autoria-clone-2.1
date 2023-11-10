"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealerMiddleware = void 0;
const api_error_1 = require("../errors/api.error");
const dealer_repository_1 = require("../repositories/dealer.repository");
class DealerMiddleware {
    async getByIdOrThrow(req, res, next) {
        try {
            const { dealerId } = req.params;
            const dealer = await dealer_repository_1.dealerRepository.findById(dealerId);
            if (!dealer) {
                throw new api_error_1.ApiError("Dealer not found", 404);
            }
            req.res.locals = dealer;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.dealerMiddleware = new DealerMiddleware();
