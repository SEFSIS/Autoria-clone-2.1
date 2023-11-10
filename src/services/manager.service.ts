import { managerRepository } from "../repositories/manager.repository";
import { IManager } from "../types/manager.type";

class ManagerService {
  public async getAll(): Promise<IManager[]> {
    return await managerRepository.getAll();
  }

  public async createManager(dto: IManager): Promise<IManager> {
    return await managerRepository.createManager(dto);
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
}

export const managerService = new ManagerService();
