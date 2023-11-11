import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { tokenAdminRepository } from "../repositories/token-admin.repository";
import { tokenAdminService } from "../services/token-admin.service";

class AuthAdminMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("No Token!", 401);
      }

      const payload = tokenAdminService.checkToken(accessToken, "access");

      const entity = await tokenAdminRepository.findOne({ accessToken });

      if (!entity) {
        throw new ApiError("Token not valid!", 401);
      }

      req.res.locals.tokenPayload = payload;
      req.res.locals.accessToken = accessToken;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        throw new ApiError("No Token!", 401);
      }

      const payload = tokenAdminService.checkToken(refreshToken, "refresh");

      const entity = await tokenAdminRepository.findOne({ refreshToken });

      if (!entity) {
        throw new ApiError("Token not valid!", 401);
      }

      req.res.locals.tokenPayload = payload;
      req.res.locals.refreshToken = refreshToken;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authAdminMiddleware = new AuthAdminMiddleware();
