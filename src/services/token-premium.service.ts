import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../errors/api.error";
import {
  INewTokenPremiumPayload,
  INewTokensPremiumPair,
} from "../types/token-dealer.type";

class TokenPremiumService {
  public generateTokenPremiumPair(
    payload: INewTokenPremiumPayload,
  ): INewTokensPremiumPair {
    const newAccessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "4h",
    });

    return {
      newAccessToken,
    };
  }
  public checkToken(
    token: string,
    type: "access" | "refresh",
  ): INewTokenPremiumPayload {
    try {
      let secret: string;

      switch (type) {
        case "access":
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case "refresh":
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as INewTokenPremiumPayload;
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }
}
export const tokenPremiumService = new TokenPremiumService();
