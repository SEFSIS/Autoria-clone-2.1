import { FilterQuery } from "mongoose";

import { Premium } from "../models/Premium.model";
import { IPremium } from "../types/premium.type";

class PremiumRepository {
  public async getAll(): Promise<IPremium[]> {
    return await Premium.find().populate("_dealerId");
  }
  public async createPremium(
    dto: IPremium,
    dealerId: string,
  ): Promise<IPremium> {
    return await (
      await Premium.create({ ...dto, _dealerId: dealerId })
    ).populate("_dealerId");
  }

  public async getOneByParams(
    params: FilterQuery<IPremium>,
  ): Promise<IPremium> {
    return await Premium.findOne(params);
  }
}

export const premiumRepository = new PremiumRepository();
