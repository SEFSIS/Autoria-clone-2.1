"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientService = void 0;
const client_repository_1 = require("../repositories/client.repository");
class ClientService {
    async getAll() {
        return await client_repository_1.clientRepository.getAll();
    }
    async updateClient(clientId, dto) {
        return await client_repository_1.clientRepository.updateClient(clientId, dto);
    }
    async deleteClient(clientId) {
        await client_repository_1.clientRepository.deleteClient(clientId);
    }
}
exports.clientService = new ClientService();
