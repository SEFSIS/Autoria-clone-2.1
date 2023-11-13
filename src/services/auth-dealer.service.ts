import { ObjectId } from "mongodb";

import { ApiError } from "../errors/api.error";
import { dealerRepository } from "../repositories/dealer.repository";
import { tokenDealerRepository } from "../repositories/token-dealer.repository";
import { IDealerCredentials } from "../types/dealer.type";
import {
  ITokenDealerPayload,
  ITokensDealerPair,
} from "../types/token-dealer.type";
import { passwordService } from "./password.service";
import { tokenDealerService } from "./token-dealer.service";

class AuthDealerService {
  public async register(dto: IDealerCredentials): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(dto.password);
      await dealerRepository.register({ ...dto, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(dto: IDealerCredentials): Promise<ITokensDealerPair> {
    try {
      const dealer = await dealerRepository.getOneByParams({
        email: dto.email,
      });
      if (!dealer) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const isMatched = await passwordService.compare(
        dto.password,
        dealer.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      const tokensDealerPair = await tokenDealerService.generateTokenDealerPair(
        {
          dealerId: dealer._id.toString(),
          name: dealer.name,
        },
      );
      await tokenDealerRepository.createTokenDealer({
        ...tokensDealerPair,
        _dealerId: dealer._id,
      });

      return tokensDealerPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    payload: ITokenDealerPayload,
    refreshToken: string,
  ): Promise<ITokensDealerPair> {
    try {
      const tokensPair = tokenDealerService.generateTokenDealerPair({
        dealerId: payload.dealerId,
        name: payload.name,
      });

      await Promise.all([
        tokenDealerRepository.createTokenDealer({
          ...tokensPair,
          _dealerId: new ObjectId(payload.dealerId),
        }),
        tokenDealerRepository.deleteOne({ refreshToken }),
      ]);

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authDealerService = new AuthDealerService();
