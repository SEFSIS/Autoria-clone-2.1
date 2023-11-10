import { TokenDealer } from "../models/Token-dealer.model";
import { ITokenDealer } from "../types/token-dealer.type";

export class TokenDealerRepository {
  public async create(dto: Partial<ITokenDealer>): Promise<ITokenDealer> {
    return (await TokenDealer.create(dto)) as ITokenDealer;
  }
}

export const tokenDealerRepository = new TokenDealerRepository();
