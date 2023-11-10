import { NextFunction, Request, Response } from "express";

import { authDealerService } from "../services/auth-dealer.service";
import { ITokensDealerPair } from "../types/token-dealer.type";

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
}

export const authDealerController = new AuthDealerController();
