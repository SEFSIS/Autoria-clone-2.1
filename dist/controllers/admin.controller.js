"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const admin_service_1 = require("../services/admin.service");
class AdminController {
    async getAll(req, res, next) {
        try {
            const admins = await admin_service_1.adminService.getAll();
            return res.json(admins);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const admin = req.res.locals;
            res.json(admin);
        }
        catch (e) {
            next(e);
        }
    }
    async createAdmin(req, res, next) {
        try {
            const admin = await admin_service_1.adminService.createAdmin(req.body);
            res.status(201).json(admin);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteAdmin(req, res, next) {
        try {
            await admin_service_1.adminService.deleteAdmin(req.params.adminId);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async updateAdmin(req, res, next) {
        try {
            const admin = await admin_service_1.adminService.updateAdmin(req.params.adminId, req.body);
            res.status(201).json(admin);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.adminController = new AdminController();
