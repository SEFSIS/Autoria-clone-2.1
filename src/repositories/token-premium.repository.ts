import { FilterQuery } from "mongoose";

import { NewTokenPremium } from "../models/Token-dealer.model";
import { INewTokenPremium } from "../types/token-dealer.type";

export class TokenPremiumRepository {
  public async createTokenPremium(
    dto: Partial<INewTokenPremium>,
  ): Promise<INewTokenPremium> {
    return (await NewTokenPremium.create(dto)) as INewTokenPremium;
  }

  public async findOne(
    params: FilterQuery<INewTokenPremium>,
  ): Promise<INewTokenPremium> {
    return await NewTokenPremium.findOne(params);
  }

  public async deleteOne(params: FilterQuery<INewTokenPremium>): Promise<void> {
    await NewTokenPremium.deleteOne(params);
  }
}

export const tokenPremiumRepository = new TokenPremiumRepository();
