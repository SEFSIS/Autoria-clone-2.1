import { FilterQuery } from "mongoose";

import { Admin } from "../models/Admin.model";
import { IAdmin, IAdminCredentials } from "../types/admin.type";

class AdminRepository {
  public async getAll(): Promise<IAdmin[]> {
    return await Admin.find();
  }

  public async getOneByParams(params: FilterQuery<IAdmin>): Promise<IAdmin> {
    return await Admin.findOne(params);
  }

  public async findById(id: string): Promise<IAdmin> {
    return await Admin.findById(id);
  }

  public async createAdmin(dto: IAdmin): Promise<IAdmin> {
    return await Admin.create(dto);
  }

  public async updateAdmin(
    adminId: string,
    dto: Partial<IAdmin>,
  ): Promise<IAdmin> {
    return await Admin.findByIdAndUpdate(adminId, dto, {
      returnDocument: "after",
    });
  }

  public async deleteAdmin(adminId: string): Promise<void> {
    await Admin.deleteOne({ _id: adminId });
  }

  public async register(dto: IAdminCredentials): Promise<IAdmin> {
    return await Admin.create(dto);
  }
}

export const adminRepository = new AdminRepository();
