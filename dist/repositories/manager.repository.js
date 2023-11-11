"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerRepository = void 0;
const Manager_model_1 = require("../models/Manager.model");
class ManagerRepository {
    async getAll() {
        return await Manager_model_1.Manager.find();
    }
    async getOneByParams(params) {
        return await Manager_model_1.Manager.findOne(params);
    }
    async findById(id) {
        return await Manager_model_1.Manager.findById(id);
    }
    async updateManager(managerId, dto) {
        return await Manager_model_1.Manager.findByIdAndUpdate(managerId, dto, {
            returnDocument: "after",
        });
    }
    async deleteManager(managerId) {
        await Manager_model_1.Manager.deleteOne({ _id: managerId });
    }
    async register(dto) {
        return await Manager_model_1.Manager.create(dto);
    }
}
exports.managerRepository = new ManagerRepository();
