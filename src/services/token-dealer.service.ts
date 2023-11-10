import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import {
  ITokenDealerPayload,
  ITokensDealerPair,
} from "../types/token-dealer.type";

class TokenDealerService {
  public generateTokenDealerPair(
    payload: ITokenDealerPayload,
  ): ITokensDealerPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "4h",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenDealerService = new TokenDealerService();
