import { NextFunction, Request, Response } from "express";
import {ApiError} from "../errors/api.error";
import {tokenPremiumService} from "../services/token-premium.service";
import {tokenPremiumRepository} from "../repositories/token-premium.repository";



class AuthPremiumMiddleware {
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

      const payload = tokenPremiumService.checkToken(accessToken, "access");

      const entity = await tokenPremiumRepository.findOne({ accessToken });

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
}

export const authPremiumMiddleware = new AuthPremiumMiddleware();
