import { managerRepository } from "../repositories/manager.repository";
import { IManager } from "../types/manager.type";

class ManagerService {
  public async getAll(): Promise<IManager[]> {
    return await managerRepository.getAll();
  }

  public async updateManager(
    managerId: string,
    dto: Partial<IManager>,
  ): Promise<IManager> {
    return await managerRepository.updateManager(managerId, dto);
  }

  public async deleteManager(managerId: string): Promise<void> {
    await managerRepository.deleteManager(managerId);
  }

  public async getMe(managerId: string): Promise<IManager> {
    return await managerRepository.findById(managerId);
  }
}

export const managerService = new ManagerService();
