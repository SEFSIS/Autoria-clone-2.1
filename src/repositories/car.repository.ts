import { FilterQuery } from "mongoose";

import { ECity } from "../enums/city.enum";
import { Car } from "../models/Car.model";
import { ICar } from "../types/car.type";

class CarRepository {
  public async getAll(): Promise<ICar[]> {
    return await Car.find().populate("_dealerId");
  }
  public async getOneByParams(params: FilterQuery<ICar>): Promise<ICar> {
    return await Car.findOne(params);
  }

  public async findById(id: string): Promise<ICar> {
    return await Car.findById(id);
  }

  public async createCar(dto: ICar, dealerId: string): Promise<ICar> {
    return await (
      await Car.create({ ...dto, _dealerId: dealerId })
    ).populate("_dealerId");
  }

  public async updateCar(carId: string, dto: Partial<ICar>): Promise<ICar> {
    return await Car.findByIdAndUpdate(carId, dto, {
      returnDocument: "after",
    }).populate("_dealerId");
  }

  public async deleteCar(carId: string): Promise<void> {
    await Car.deleteOne({ _id: carId });
  }

  public async incrementViews(carId: string): Promise<void> {
    // Збільшити кількість переглядів для конкретного автомобіля
    await Car.updateOne(
      { _id: carId },
      {
        $inc: {
          views: 1,
          dailyViews: 1,
          monthlyViews: 1,
          yearlyViews: 1,
        },
        lastViewedAt: new Date(),
      },
    );
  }
  public async getAveragePriceByCity(city: ECity): Promise<number> {
    const cars: ICar[] = await Car.find({ city, price: { $gt: 0 } });

    if (cars.length === 0) {
      return 0; // Return 0 if there are no cars in the specified city
    }

    const totalPrices: number = cars.reduce(
      (total, car) => total + car.price!,
      0,
    );
    const averagePrice: number = totalPrices / cars.length;

    return averagePrice || 0;
  }

  public async getAveragePriceForAllCities(): Promise<number> {
    const cars: ICar[] = await Car.find({ price: { $gt: 0 } });

    if (cars.length === 0) {
      return 0; // Return 0 if there are no cars with a price greater than 0
    }

    const totalPrices: number = cars.reduce(
      (total, car) => total + car.price!,
      0,
    );
    const averagePrice: number = totalPrices / cars.length;

    return averagePrice || 0;
  }

  public async updateOneById(carId: string, dto: Partial<ICar>): Promise<ICar> {
    return await Car.findByIdAndUpdate(carId, dto, {
      returnDocument: "after",
    });
  }
}

export const carRepository = new CarRepository();
