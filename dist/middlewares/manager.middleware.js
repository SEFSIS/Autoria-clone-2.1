"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerMiddleware = void 0;
const api_error_1 = require("../errors/api.error");
const manager_repository_1 = require("../repositories/manager.repository");
class ManagerMiddleware {
    async getByIdOrThrow(req, res, next) {
        try {
            const { managerId } = req.params;
            const manager = await manager_repository_1.managerRepository.findById(managerId);
            if (!manager) {
                throw new api_error_1.ApiError("Manager not found", 404);
            }
            req.res.locals = manager;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.managerMiddleware = new ManagerMiddleware();
