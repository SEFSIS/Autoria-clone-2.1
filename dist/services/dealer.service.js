"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealerService = void 0;
const dealer_repository_1 = require("../repositories/dealer.repository");
class DealerService {
    async getAll() {
        return await dealer_repository_1.dealerRepository.getAll();
    }
    async updateDealer(dealerId, dto) {
        return await dealer_repository_1.dealerRepository.updateDealer(dealerId, dto);
    }
    async deleteDealer(dealerId) {
        await dealer_repository_1.dealerRepository.deleteDealer(dealerId);
    }
}
exports.dealerService = new DealerService();
