import Filter from "bad-words";
import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { carRepository } from "../repositories/car.repository";

class CarMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { carId } = req.params;

      const car = await carRepository.findById(carId);
      if (!car) {
        throw new ApiError("Car not found", 404);
      }

      req.res.locals = car;

      next();
    } catch (e) {
      next(e);
    }
  }

  public checkForBadWords(req: Request, res: Response, next: NextFunction) {
    try {
      const badWordsFilter = new Filter();

      for (const key in req.body) {
        if (typeof req.body[key] === "string") {
          const text = req.body[key];

          if (badWordsFilter.isProfane(text)) {
            throw new ApiError(
              "The use of profanity is prohibited, idiot!",
              400,
            );
          }
        }
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const carMiddleware = new CarMiddleware();
