import { FilterQuery } from "mongoose";

import { TokenClient } from "../models/Token-client.model";
import { ITokenClient } from "../types/token-client.type";

export class TokenClientRepository {
  public async create(dto: Partial<ITokenClient>): Promise<ITokenClient> {
    return (await TokenClient.create(dto)) as ITokenClient;
  }

  public async findOne(
    params: FilterQuery<ITokenClient>,
  ): Promise<ITokenClient> {
    return await TokenClient.findOne(params);
  }

  public async deleteOne(params: FilterQuery<ITokenClient>): Promise<void> {
    await TokenClient.deleteOne(params);
  }
}

export const tokenClientRepository = new TokenClientRepository();
