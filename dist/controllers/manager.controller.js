"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerController = void 0;
const manager_service_1 = require("../services/manager.service");
class ManagerController {
    async getAll(req, res, next) {
        try {
            const managers = await manager_service_1.managerService.getAll();
            return res.json(managers);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const manager = req.res.locals;
            res.json(manager);
        }
        catch (e) {
            next(e);
        }
    }
    async createManager(req, res, next) {
        try {
            const manager = await manager_service_1.managerService.createManager(req.body);
            res.status(201).json(manager);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteManager(req, res, next) {
        try {
            await manager_service_1.managerService.deleteManager(req.params.managerId);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async updateManager(req, res, next) {
        try {
            const manager = await manager_service_1.managerService.updateManager(req.params.managerId, req.body);
            res.status(201).json(manager);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.managerController = new ManagerController();
