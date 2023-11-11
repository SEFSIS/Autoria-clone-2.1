import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
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
}

export const tokenAdminService = new TokenAdminService();
