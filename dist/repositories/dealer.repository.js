"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealerRepository = void 0;
const Dealer_model_1 = require("../models/Dealer.model");
class DealerRepository {
    async getAll() {
        return await Dealer_model_1.Dealer.find();
    }
    async getOneByParams(params) {
        return await Dealer_model_1.Dealer.findOne(params);
    }
    async findById(id) {
        return await Dealer_model_1.Dealer.findById(id);
    }
    async updateDealer(dealerId, dto) {
        return await Dealer_model_1.Dealer.findByIdAndUpdate(dealerId, dto, {
            returnDocument: "after",
        });
    }
    async register(dto) {
        return await Dealer_model_1.Dealer.create(dto);
    }
    async deleteDealer(dealerId) {
        await Dealer_model_1.Dealer.deleteOne({ _id: dealerId });
    }
}
exports.dealerRepository = new DealerRepository();
