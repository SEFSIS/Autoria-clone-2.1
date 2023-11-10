"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRepository = void 0;
const Client_model_1 = require("../models/Client.model");
class ClientRepository {
    async getAll() {
        return await Client_model_1.Client.find();
    }
    async getOneByParams(params) {
        return await Client_model_1.Client.findOne(params);
    }
    async findById(id) {
        return await Client_model_1.Client.findById(id);
    }
    async updateClient(clientId, dto) {
        return await Client_model_1.Client.findByIdAndUpdate(clientId, dto, {
            returnDocument: "after",
        });
    }
    async deleteClient(clientId) {
        await Client_model_1.Client.deleteOne({ _id: clientId });
    }
}
exports.clientRepository = new ClientRepository();
