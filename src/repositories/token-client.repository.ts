import { TokenClient } from "../models/Token-client.model";
import { ITokenClient } from "../types/token-client.type";

export class TokenClientRepository {
  public async create(dto: Partial<ITokenClient>): Promise<ITokenClient> {
    return (await TokenClient.create(dto)) as ITokenClient;
  }
}

export const tokenClientRepository = new TokenClientRepository();
