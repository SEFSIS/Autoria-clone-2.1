import { NextFunction, Request, Response } from "express";

import { ERoles } from "../enums/role.enum";
import { EStatus } from "../enums/status.enum";
import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
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

      const entity = await tokenRepository.findOne({ accessToken });

      if (!entity) {
        throw new ApiError("Token not valid!", 401);
      }

      const payload = tokenService.checkToken(accessToken, "access");
      req.res.locals.tokenPayload = payload;
      req.res.locals.accessToken = accessToken;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.tokenPayload;
      const userRole = payload.role;

      if (userRole !== ERoles.Manager && userRole !== ERoles.Admin) {
        throw new ApiError(
          "Access denied. Only managers and admins are allowed.",
          403,
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkUserOnly(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.tokenPayload;
      const userRole = payload.role;

      if (userRole !== ERoles.User) {
        throw new ApiError(
          "Access denied. Only users are allowed for this action.",
          403,
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkAdminOnly(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.tokenPayload;
      const userRole = payload.role;

      if (userRole !== ERoles.Admin) {
        throw new ApiError(
          "Access denied. Only admins are allowed for this action.",
          403,
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkPremium(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.tokenPayload;
      const userStatus = payload.status;

      if (userStatus !== EStatus.premium) {
        throw new ApiError(
          "The access is granted exclusively to users with a premium account.",
          403,
        );
      }

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

      const payload = tokenService.checkToken(refreshToken, "refresh");

      const entity = await tokenRepository.findOne({ refreshToken });

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

export const authMiddleware = new AuthMiddleware();
