import { NextFunction, Request, Response } from "express";

import { authAdminService } from "../services/auth-admin.service";
import { ITokensAdminPair } from "../types/token-admin.type";

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
}

export const authAdminController = new AuthAdminController();
