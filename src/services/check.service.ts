import { checkRepository } from "../repositories/check.repository";
import { ICheck } from "../types/check.type";

class CheckService {
  public async getAll(): Promise<ICheck[]> {
    return await checkRepository.getAll();
  }

  public async createCheck(dto: ICheck, userId: string): Promise<ICheck> {
    return await checkRepository.createCheck(dto, userId);
  }
}

export const checkService = new CheckService();
