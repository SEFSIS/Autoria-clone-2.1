import { FilterQuery } from "mongoose";

import { TokenManager } from "../models/Token-manager.model";
import { ITokenManager } from "../types/token-manager.type";

export class TokenManagerRepository {
  public async create(dto: Partial<ITokenManager>): Promise<ITokenManager> {
    return (await TokenManager.create(dto)) as ITokenManager;
  }

  public async findOne(
    params: FilterQuery<ITokenManager>,
  ): Promise<ITokenManager> {
    return await TokenManager.findOne(params);
  }

  public async deleteOne(params: FilterQuery<ITokenManager>): Promise<void> {
    await TokenManager.deleteOne(params);
  }
}

export const tokenManagerRepository = new TokenManagerRepository();
