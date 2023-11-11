import { NextFunction, Request, Response } from "express";


import {ITokenAdminPayload, ITokensAdminPair} from "../types/token-admin.type";
import {authAdminService} from "../services/auth-admin.service";


class AuthAdminController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await authAdminService.register(req.body);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensAdminPair>> {
    try {
      const tokensAdminPair = await authAdminService.login(req.body);

      return res.json(tokensAdminPair);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensAdminPair>> {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenAdminPayload;
      const refreshToken = req.res.locals.refreshToken as string;

      const tokensPair = await authAdminService.refresh(
        tokenPayload,
        refreshToken,
      );

      return res.status(201).json(tokensPair);
    } catch (e) {
      next(e);
    }
  }
}

export const authAdminController = new AuthAdminController();
