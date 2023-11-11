import { FilterQuery } from "mongoose";

import { Manager } from "../models/Manager.model";
import { IManager, IManagerCredentials } from "../types/manager.type";

class ManagerRepository {
  public async getAll(): Promise<IManager[]> {
    return await Manager.find();
  }

  public async getOneByParams(
    params: FilterQuery<IManager>,
  ): Promise<IManager> {
    return await Manager.findOne(params);
  }

  public async findById(id: string): Promise<IManager> {
    return await Manager.findById(id);
  }

  public async updateManager(
    managerId: string,
    dto: Partial<IManager>,
  ): Promise<IManager> {
    return await Manager.findByIdAndUpdate(managerId, dto, {
      returnDocument: "after",
    });
  }

  public async deleteManager(managerId: string): Promise<void> {
    await Manager.deleteOne({ _id: managerId });
  }

  public async register(dto: IManagerCredentials): Promise<IManager> {
    return await Manager.create(dto);
  }
}

export const managerRepository = new ManagerRepository();
