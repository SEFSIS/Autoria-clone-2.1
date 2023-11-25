import { NextFunction, Request, Response } from "express";

import { carService } from "../services/car.service";
import { ICar } from "../types/car.type";
import { ITokenPayload } from "../types/token.type";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar[]>> {
    try {
      const cars = await carService.getAll();

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }
  public async createCar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;

      const car = await carService.createCar(req.body, userId);

      res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }
  public async deleteCar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;

      await carService.deleteCar(req.params.carId, userId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateCar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;
      const car = await carService.updateCar(
        req.params.carId,
        req.body,
        userId,
      );

      res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const car = req.res.locals;

      await carService.incrementViews(car._id); // Збільшуємо кількість переглядів
      res.json(car);
    } catch (e) {
      next(e);
    }
  }

  public async getAllPopular(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar[]>> {
    try {
      const cars = await carService.getMostViewedCars();

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  public async getAveragePriceByCity(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<number>> {
    try {
      const city = req.params.city;
      const averagePrice = await carService.getAveragePriceByCity(city);

      return res.json(averagePrice);
    } catch (error) {
      next(error);
    }
  }

  public async getAverageCarPrice(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const averagePrice = await carService.getAverageCarPrice();
      res.json({ averagePrice });
    } catch (error) {
      next(error);
    }
  }
}

export const carController = new CarController();
