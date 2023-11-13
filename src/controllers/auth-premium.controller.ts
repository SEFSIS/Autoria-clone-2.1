import { NextFunction, Request, Response } from "express";

import { authPremiumService } from "../services/auth-premium.service";
import { INewTokensPremiumPair } from "../types/token-dealer.type";

class AuthPremiumController {
  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<INewTokensPremiumPair>> {
    try {
      const tokensPremiumPair = await authPremiumService.login(req.body);

      return res.json(tokensPremiumPair);
    } catch (e) {
      next(e);
    }
  }
}

export const authPremiumController = new AuthPremiumController();
