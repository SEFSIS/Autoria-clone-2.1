import Filter from "bad-words";
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { ECarStatus } from "../enums/car.status.enum";
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
  // public isCarBodyValid(validator: ObjectSchema) {
  //   return async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const { error, value } = validator.validate(req.body);
  //       await this.checkForBadWords(req.body);
  //
  //       if (error) {
  //         throw new ApiError(error.message, 400);
  //       }
  //       req.body = value;
  //       next();
  //     } catch (e) {
  //       next(e);
  //     }
  //   };
  // }

  public isCarBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);
        await this.checkForBadWords(req.body);

        if (error) {
          throw new ApiError(error.message, 400);
        }
        req.body = value;
        next();
      } catch (e) {
        if (e instanceof ApiError && e.status === 400) {
          // Встановлюємо статус inactive для нової машини при вичерпанні ліміту редагувань
          req.body = { ...req.body, status: ECarStatus.inactive };
        }
        next(e);
      }
    };
  }

  private badWordsFilter = new Filter();
  private editAttemptsMap = new Map<string, number>(); // Лічильник редагувань
  private maxEditAttempts = 3; // Максимальна кількість редагувань

  private async checkForBadWords(data: any) {
    if (typeof data === "object") {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          await this.checkForBadWords(data[key]);
        }
      }
    } else if (typeof data === "string") {
      if (this.badWordsFilter.isProfane(data)) {
        const userId = "exampleUserId"; // Замініть на реальний ідентифікатор користувача

        // Перевірка кількості редагувань
        const editAttempts = this.getEditAttempts(userId);

        if (editAttempts < this.maxEditAttempts) {
          this.incrementEditAttempts(userId);
          throw new ApiError(
            "Do not use foul language! Вам залишилося редагувань: " +
              (this.maxEditAttempts - editAttempts),
            400,
          );
        } else {
          throw new ApiError(
            "Do not use foul language! Ви вичерпали ліміт редагувань.",
            400,
          );
        }
      }
    }
  }

  private incrementEditAttempts(userId: string): void {
    const currentAttempts = this.getEditAttempts(userId);
    this.editAttemptsMap.set(userId, currentAttempts + 1);
  }

  private getEditAttempts(userId: string): number {
    return this.editAttemptsMap.get(userId) || 0;
  }
}

export const carMiddleware = new CarMiddleware();
