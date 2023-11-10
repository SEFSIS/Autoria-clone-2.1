"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const admin_repository_1 = require("../repositories/admin.repository");
class AdminService {
    async getAll() {
        return await admin_repository_1.adminRepository.getAll();
    }
    async createAdmin(dto) {
        return await admin_repository_1.adminRepository.createAdmin(dto);
    }
    async updateAdmin(adminId, dto) {
        return await admin_repository_1.adminRepository.updateAdmin(adminId, dto);
    }
    async deleteAdmin(adminId) {
        await admin_repository_1.adminRepository.deleteAdmin(adminId);
    }
}
exports.adminService = new AdminService();
