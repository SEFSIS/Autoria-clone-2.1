import { User } from "../models/User.model";
import { checkRepository } from "../repositories/check.repository";
import { ICheck } from "../types/check.type";
import { IUser } from "../types/user.type";

class CheckService {
  public async getAll(): Promise<ICheck[]> {
    return await checkRepository.getAll();
  }

  public async createCheck(dto: ICheck, userId: string): Promise<ICheck> {
    const user: IUser | null = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.wallet < dto.price) {
      throw new Error("Insufficient funds");
    }

    user.wallet -= dto.price;

    await user.save();

    const createdCheck: ICheck = await checkRepository.createCheck(dto, userId);
    return createdCheck;
  }
}

export const checkService = new CheckService();
