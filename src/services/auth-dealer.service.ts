import { ApiError } from "../errors/api.error";
import { dealerRepository } from "../repositories/dealer.repository";
import { tokenDealerRepository } from "../repositories/token-dealer.repository";
import { IDealerCredentials } from "../types/dealer.type";
import { ITokensDealerPair } from "../types/token-dealer.type";
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
          dealerId: dealer._id,
          name: dealer.name,
        },
      );
      await tokenDealerRepository.create({
        ...tokensDealerPair,
        _dealerId: dealer._id,
      });

      return tokensDealerPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authDealerService = new AuthDealerService();
