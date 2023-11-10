"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientMiddleware = void 0;
const api_error_1 = require("../errors/api.error");
const client_repository_1 = require("../repositories/client.repository");
class ClientMiddleware {
    async getByIdOrThrow(req, res, next) {
        try {
            const { clientId } = req.params;
            const client = await client_repository_1.clientRepository.findById(clientId);
            if (!client) {
                throw new api_error_1.ApiError("Client not found", 404);
            }
            req.res.locals = client;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.clientMiddleware = new ClientMiddleware();
