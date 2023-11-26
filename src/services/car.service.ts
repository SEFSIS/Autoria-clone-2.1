import { ERoles } from "../enums/role.enum";
import { ApiError } from "../errors/api.error";
import { Car } from "../models/Car.model";
import { carRepository } from "../repositories/car.repository";
import { userRepository } from "../repositories/user.repository";
import { ICar } from "../types/car.type";
import { IPaginationResponse, IQuery } from "../types/pagination.type";

class CarService {
  public async getAll(): Promise<ICar[]> {
    return await carRepository.getAll();
  }

  public async getAllWithPagination(
    query: IQuery,
  ): Promise<IPaginationResponse<ICar>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
      );

      const {
        page = 1,
        limit = 5,
        sortedBy = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = +limit * (+page - 1);

      const [cars, itemsFound] = await Promise.all([
        Car.find(searchObject)
          .limit(+limit)
          .skip(skip)
          .sort(sortedBy)
          .populate("_userId"),
        Car.count(searchObject),
      ]);

      return {
        page: +page,
        limit: +limit,
        itemsFound: itemsFound,
        data: cars,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async createCar(dto: ICar, userId: string): Promise<ICar> {
    return await carRepository.createCar(dto, userId);
  }

  public async updateCar(
    carId: string,
    dto: Partial<ICar>,
    userId: string,
  ): Promise<ICar> {
    await this.checkAbilityToManage(userId, carId);
    return await carRepository.updateCar(carId, dto);
  }

  public async deleteCar(carId: string, userId: string): Promise<void> {
    await this.checkAbilityToManage(userId, carId);
    await carRepository.deleteCar(carId);
  }

  private async checkAbilityToManage(
    userId: string,
    manageCarId: string,
  ): Promise<ICar | null> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    if (user.role === ERoles.Manager || user.role === ERoles.Admin) {
      return await carRepository.findById(manageCarId);
    }

    return await carRepository.getOneByParams({
      _userId: userId,
      _id: manageCarId,
    });
  }

  public async incrementViews(carId: string): Promise<void> {
    await carRepository.incrementViews(carId);
  }

  public async getMostViewedCars(): Promise<ICar[]> {
    try {
      const mostViewedCars = await (
        await carRepository.getAll()
      ).sort((a, b) => b.views - a.views);
      return mostViewedCars;
    } catch (error) {
      console.error("Error getting most viewed cars:", error);
      return [];
    }
  }

  public async getAveragePriceByCity(city: string): Promise<number> {
    try {
      const carsInCity = await carRepository.getAllByCity(city);
      const prices = carsInCity.map((car: ICar) => car.price || 0);
      const totalPrices = prices.reduce((acc, price) => acc + price, 0);
      const averagePrice = totalPrices / prices.length;

      return averagePrice;
    } catch (error) {
      console.error("Error calculating average price by city:", error);
      throw new Error("Unable to calculate average price.");
    }
  }

  public async getAverageCarPrice(): Promise<number> {
    try {
      const cars = await carRepository.getAll();
      const prices = cars.map((car: ICar) => car.price || 0);
      const totalPrices = prices.reduce(
        (acc: number, price: number) => acc + price,
        0,
      );
      const averagePrice = totalPrices / prices.length;

      return averagePrice;
    } catch (error) {
      console.error("Error calculating average car price:", error);
      throw new Error("Unable to calculate average car price.");
    }
  }
}

export const carService = new CarService();
