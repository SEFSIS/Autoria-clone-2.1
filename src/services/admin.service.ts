import { adminRepository } from "../repositories/admin.repository";
import { IAdmin } from "../types/admin.type";

class AdminService {
  public async getAll(): Promise<IAdmin[]> {
    return await adminRepository.getAll();
  }

  public async updateAdmin(
    adminId: string,
    dto: Partial<IAdmin>,
  ): Promise<IAdmin> {
    return await adminRepository.updateAdmin(adminId, dto);
  }

  public async deleteAdmin(adminId: string): Promise<void> {
    await adminRepository.deleteAdmin(adminId);
  }

  public async getMe(adminId: string): Promise<IAdmin> {
    return await adminRepository.findById(adminId);
  }
}

export const adminService = new AdminService();
