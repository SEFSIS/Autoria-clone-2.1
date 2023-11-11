import { NextFunction, Request, Response } from "express";

import { authManagerService } from "../services/auth-manager.service";
import {ITokenManagerPayload, ITokensManagerPair} from "../types/token-manager.type";

class AuthManagerController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await authManagerService.register(req.body);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensManagerPair>> {
    try {
      const tokensManagerPair = await authManagerService.login(req.body);

      return res.json(tokensManagerPair);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensManagerPair>> {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenManagerPayload;
      const refreshToken = req.res.locals.refreshToken as string;

      const tokensPair = await authManagerService.refresh(
        tokenPayload,
        refreshToken,
      );

      return res.status(201).json(tokensPair);
    } catch (e) {
      next(e);
    }
  }
}

export const authManagerController = new AuthManagerController();
