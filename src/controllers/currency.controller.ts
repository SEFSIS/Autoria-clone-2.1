import { NextFunction, Request, Response } from "express";

import { currencyService } from "../services/currency.service";
import { ICurrency } from "../types/currency.type";
import { ITokenClientPayload } from "../types/token-client.type";

class CurrencyController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICurrency[]>> {
    try {
      const currencys = await currencyService.getAll();

      return res.json(currencys);
    } catch (e) {
      next(e);
    }
  }
  public async createCurrency(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { clientId } = req.res.locals.tokenPayload as ITokenClientPayload;

      const currency = await currencyService.createCurrency(req.body, clientId);

      res.status(201).json(currency);
    } catch (e) {
      next(e);
    }
  }
}

export const currencyController = new CurrencyController();
