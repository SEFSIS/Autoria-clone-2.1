import { NextFunction, Request, Response } from "express";

import { authClientService } from "../services/auth-client.service";
import { ITokensClientPair } from "../types/token-client.type";

class AuthClientController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await authClientService.register(req.body);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensClientPair>> {
    try {
      const tokensClientPair = await authClientService.login(req.body);

      return res.json(tokensClientPair);
    } catch (e) {
      next(e);
    }
  }
}

export const authClientController = new AuthClientController();
