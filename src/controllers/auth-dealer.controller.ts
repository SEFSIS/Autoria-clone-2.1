import { NextFunction, Request, Response } from "express";

import { authDealerService } from "../services/auth-dealer.service";
import {
  ITokenDealerPayload,
  ITokensDealerPair,
} from "../types/token-dealer.type";

class AuthDealerController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await authDealerService.register(req.body);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensDealerPair>> {
    try {
      const tokensDealerPair = await authDealerService.login(req.body);

      return res.json(tokensDealerPair);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensDealerPair>> {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenDealerPayload;
      const refreshToken = req.res.locals.refreshToken as string;

      const tokensPair = await authDealerService.refresh(
        tokenPayload,
        refreshToken,
      );

      return res.status(201).json(tokensPair);
    } catch (e) {
      next(e);
    }
  }
}

export const authDealerController = new AuthDealerController();
