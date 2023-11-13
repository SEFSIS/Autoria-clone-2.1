import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ECity } from "../enums/city.enum";
import { carPresenter } from "../presenters/car.presenter";
import { carService } from "../services/car.service";
import { ICar } from "../types/car.type";
import { ITokenDealerPayload } from "../types/token-dealer.type";
import {premiumService} from "../services/premium.service";

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
      const { dealerId } = req.res.locals.tokenPayload as ITokenDealerPayload;

      const car = await carService.createCar(req.body, dealerId);

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
      const { dealerId } = req.res.locals.tokenPayload as ITokenDealerPayload;

      await carService.deleteCar(req.params.carId, dealerId);

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
      const { dealerId } = req.res.locals.tokenPayload as ITokenDealerPayload;

      const car = await carService.updateCar(
        req.params.carId,
        req.body,
        dealerId,
      );

      res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const car = await carService.getById(req.params.carId);

      res.json(car);
    } catch (e) {
      next(e);
    }
  }
  public async getAveragePriceByCity(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { city } = req.params;
      const averagePrice = await premiumService.getAveragePriceByCity(
        city as ECity,
      );

      res.json({ averagePrice });
    } catch (e) {
      next(e);
    }
  }
  public async getAveragePriceForAllCities(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const averagePrice = await premiumService.getAveragePriceForAllCities();

      res.json({ averagePrice });
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const { carId } = req.params;
      const avatar = req.files.avatar as UploadedFile;
      const car = await carService.uploadAvatar(avatar, carId);

      const response = carPresenter.present(car);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
