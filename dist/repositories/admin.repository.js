"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepository = void 0;
const Admin_model_1 = require("../models/Admin.model");
class AdminRepository {
    async getAll() {
        return await Admin_model_1.Admin.find();
    }
    async getOneByParams(params) {
        return await Admin_model_1.Admin.findOne(params);
    }
    async findById(id) {
        return await Admin_model_1.Admin.findById(id);
    }
    async createAdmin(dto) {
        return await Admin_model_1.Admin.create(dto);
    }
    async updateAdmin(adminId, dto) {
        return await Admin_model_1.Admin.findByIdAndUpdate(adminId, dto, {
            returnDocument: "after",
        });
    }
    async deleteAdmin(adminId) {
        await Admin_model_1.Admin.deleteOne({ _id: adminId });
    }
}
exports.adminRepository = new AdminRepository();
