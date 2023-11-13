import { ApiError } from "../errors/api.error";
import { premiumRepository } from "../repositories/premium.repisotory";
import { tokenPremiumRepository } from "../repositories/token-premium.repository";
import { IPremiumCredentials } from "../types/premium.type";
import { INewTokensPremiumPair } from "../types/token-dealer.type";
import { passwordService } from "./password.service";
import { tokenPremiumService } from "./token-premium.service";

class AuthPremiumService {
  public async login(dto: IPremiumCredentials): Promise<INewTokensPremiumPair> {
    try {
      const premium = await premiumRepository.getOneByParams({
        buy: dto.buy,
      });
      if (!premium) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const isMatched = await passwordService.compare(
        dto.password,
        premium.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      const tokensPremiumPair =
        await tokenPremiumService.generateTokenPremiumPair({
          premiumId: premium._id.toString(),
          password: premium.password,
        });
      await tokenPremiumRepository.createTokenPremium({
        ...tokensPremiumPair,
        _premiumId: premium._id,
      });

      return tokensPremiumPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authPremiumService = new AuthPremiumService();
