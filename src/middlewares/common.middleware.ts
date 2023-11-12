import Filter from "bad-words";
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import mongoose from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  private badWordsFilter = new Filter();
  private editAttemptsMap = new Map<string, number>(); // Лічильник редагувань
  private maxEditAttempts = 3; // Максимальна кількість редагувань

  public isIdValid(field: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[field];

        if (!mongoose.isObjectIdOrHexString(id)) {
          throw new ApiError("Not valid ID", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(validator: ObjectSchema) {
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
        next(e);
      }
    };
  }

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

export const commonMiddleware = new CommonMiddleware();
