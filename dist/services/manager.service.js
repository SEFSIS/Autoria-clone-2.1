"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerService = void 0;
const manager_repository_1 = require("../repositories/manager.repository");
class ManagerService {
    async getAll() {
        return await manager_repository_1.managerRepository.getAll();
    }
    async updateManager(managerId, dto) {
        return await manager_repository_1.managerRepository.updateManager(managerId, dto);
    }
    async deleteManager(managerId) {
        await manager_repository_1.managerRepository.deleteManager(managerId);
    }
}
exports.managerService = new ManagerService();
