import { FilterQuery } from "mongoose";

import { Car } from "../models/Car.model";
import { ICar } from "../types/car.type";
import { IQuery } from "../types/pagination.type";

class CarRepository {
  public async getAll(): Promise<ICar[]> {
    return await Car.find().populate("_userId");
  }
  public async getMany(query: IQuery): Promise<[ICar[], number]> {
    const queryStr = JSON.stringify(query);
    const queryObj = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    );

    const { page, limit, sortedBy, ...searchObject } = queryObj;

    const skip = +limit * (+page - 1);

    return await Promise.all([
      Car.find(searchObject).populate("_userId").limit(+limit).skip(skip).sort(sortedBy),
      Car.count(searchObject),
    ]);
  }
  public async getOneByParams(params: FilterQuery<ICar>): Promise<ICar> {
    return await Car.findOne(params);
  }

  public async findById(id: string): Promise<ICar> {
    return await Car.findById(id);
  }

  public async createCar(dto: ICar, userId: string): Promise<ICar> {
    return await (
      await Car.create({ ...dto, _userId: userId })
    ).populate("_userId");
  }

  public async updateCar(carId: string, dto: Partial<ICar>): Promise<ICar> {
    return await Car.findByIdAndUpdate(carId, dto, {
      returnDocument: "after",
    }).populate("_userId");
  }

  public async deleteCar(carId: string): Promise<void> {
    await Car.deleteOne({ _id: carId });
  }

  public async incrementViews(carId: string): Promise<void> {
    const car = await Car.findById(carId);

    const today = new Date();
    const lastViewedAt = car.lastViewedAt || today;
    const lastMonth = lastViewedAt.getMonth();
    const lastYear = lastViewedAt.getFullYear();

    const update: any = { $inc: { views: 1 } };

    if (!this.isSameDay(today, lastViewedAt)) {
      update.$set = { lastViewedAt: today, dailyViews: 1 };
    } else {
      update.$inc.dailyViews = 1;
    }

    if (today.getMonth() !== lastMonth) {
      update.$set.monthlyViews = 1;
    } else {
      update.$inc.monthlyViews = 1;
    }

    if (today.getFullYear() !== lastYear) {
      update.$set.yearlyViews = 1;
    } else {
      update.$inc.yearlyViews = 1;
    }

    await Car.findByIdAndUpdate(carId, update);
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  public async getAllByCity(city: string): Promise<ICar[]> {
    return await Car.find({ city }).populate("_userId");
  }

  public async updateOneById(carId: string, dto: Partial<ICar>): Promise<ICar> {
    return await Car.findByIdAndUpdate(carId, dto, {
      returnDocument: "after",
    }).populate("_userId");
  }
}

export const carRepository = new CarRepository();
