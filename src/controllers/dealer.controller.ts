import { NextFunction, Request, Response } from "express";

import { dealerService } from "../services/dealer.service";
import { IDealer } from "../types/dealer.type";

class DealerController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IDealer[]>> {
    try {
      const dealers = await dealerService.getAll();

      return res.json(dealers);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const dealer = req.res.locals;

      res.json(dealer);
    } catch (e) {
      next(e);
    }
  }

  public async deleteDealer(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await dealerService.deleteDealer(req.params.dealerId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async updateDealer(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dealer = await dealerService.updateDealer(
        req.params.dealerId,
        req.body,
      );

      res.status(201).json(dealer);
    } catch (e) {
      next(e);
    }
  }
}

export const dealerController = new DealerController();
