"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const api_error_1 = require("../errors/api.error");
const admin_repository_1 = require("../repositories/admin.repository");
class AdminMiddleware {
    async getByIdOrThrow(req, res, next) {
        try {
            const { adminId } = req.params;
            const admin = await admin_repository_1.adminRepository.findById(adminId);
            if (!admin) {
                throw new api_error_1.ApiError("Admin not found", 404);
            }
            req.res.locals = admin;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.adminMiddleware = new AdminMiddleware();
