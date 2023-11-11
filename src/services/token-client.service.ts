import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../errors/api.error";
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

  public checkToken(
    token: string,
    type: "access" | "refresh",
  ): ITokenClientPayload {
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

      return jwt.verify(token, secret) as ITokenClientPayload;
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }
}

export const tokenClientService = new TokenClientService();
