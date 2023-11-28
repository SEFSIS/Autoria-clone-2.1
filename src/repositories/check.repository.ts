import { Check } from "../models/Check.model";
import { ICheck } from "../types/check.type";

class CheckRepository {
  public async getAll(): Promise<ICheck[]> {
    return await Check.find().populate("_userId");
  }

  public async createCheck(dto: ICheck, userId: string): Promise<ICheck> {
    return await Check.create({ ...dto, _userId: userId });
  }
}

export const checkRepository = new CheckRepository();
