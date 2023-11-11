import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../errors/api.error";
import {
  ITokenAdminPayload,
  ITokensAdminPair,
} from "../types/token-admin.type";

class TokenAdminService {
  public generateTokenAdminPair(payload: ITokenAdminPayload): ITokensAdminPair {
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
  ): ITokenAdminPayload {
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

      return jwt.verify(token, secret) as ITokenAdminPayload;
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }
}

export const tokenAdminService = new TokenAdminService();
