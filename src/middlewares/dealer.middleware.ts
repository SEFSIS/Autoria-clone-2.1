import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { dealerRepository } from "../repositories/dealer.repository";

class DealerMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { dealerId } = req.params;

      const dealer = await dealerRepository.findById(dealerId);

      if (!dealer) {
        throw new ApiError("Dealer not found", 404);
      }

      req.res.locals = dealer;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const dealerMiddleware = new DealerMiddleware();
