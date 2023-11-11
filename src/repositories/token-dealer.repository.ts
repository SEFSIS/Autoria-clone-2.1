import { FilterQuery } from "mongoose";

import { TokenDealer } from "../models/Token-dealer.model";
import { ITokenDealer } from "../types/token-dealer.type";

export class TokenDealerRepository {
  public async create(dto: Partial<ITokenDealer>): Promise<ITokenDealer> {
    return (await TokenDealer.create(dto)) as ITokenDealer;
  }
  public async findOne(
    params: FilterQuery<ITokenDealer>,
  ): Promise<ITokenDealer> {
    return await TokenDealer.findOne(params);
  }

  public async deleteOne(params: FilterQuery<ITokenDealer>): Promise<void> {
    await TokenDealer.deleteOne(params);
  }
}

export const tokenDealerRepository = new TokenDealerRepository();
