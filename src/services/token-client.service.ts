import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import {
  ITokenClientPayload,
  ITokensClientPair,
} from "../types/token-client.type";

class TokenClientService {
  public generateTokenClientPair(
    payload: ITokenClientPayload,
  ): ITokensClientPair {
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

export const tokenClientService = new TokenClientService();
