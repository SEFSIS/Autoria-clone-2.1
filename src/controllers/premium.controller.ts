import { NextFunction, Request, Response } from "express";

import { premiumService } from "../services/premium.service";
import { IPremium } from "../types/premium.type";
import { ITokenDealerPayload } from "../types/token-dealer.type";

class PremiumController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IPremium[]>> {
    try {
      const premiums = await premiumService.getAll();

      return res.json(premiums);
    } catch (e) {
      next(e);
    }
  }
  public async createPremium(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { dealerId } = req.res.locals.tokenPayload as ITokenDealerPayload;

      const premium = await premiumService.createPremium(req.body, dealerId);

      res.status(201).json(premium);
    } catch (e) {
      next(e);
    }
  }
}

export const premiumController = new PremiumController();
