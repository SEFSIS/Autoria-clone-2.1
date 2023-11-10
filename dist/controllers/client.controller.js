"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientController = void 0;
const client_service_1 = require("../services/client.service");
class ClientController {
    async getAll(req, res, next) {
        try {
            const clients = await client_service_1.clientService.getAll();
            return res.json(clients);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const client = req.res.locals;
            res.json(client);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteClient(req, res, next) {
        try {
            await client_service_1.clientService.deleteClient(req.params.clientId);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async updateClient(req, res, next) {
        try {
            const client = await client_service_1.clientService.updateClient(req.params.clientId, req.body);
            res.status(201).json(client);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.clientController = new ClientController();
