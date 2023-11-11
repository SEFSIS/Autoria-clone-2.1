import { ApiError } from "../errors/api.error";
import { carRepository } from "../repositories/car.repository";
import { ICar } from "../types/car.type";

class CarService {
  public async getAll(): Promise<ICar[]> {
    return await carRepository.getAll();
  }

  public async createCar(dto: ICar, dealerId: string): Promise<ICar> {
    return await carRepository.createCar(dto, dealerId);
  }

  public async updateCar(
    carId: string,
    dto: Partial<ICar>,
    dealerId: string,
  ): Promise<ICar> {
    await this.checkAbilityToManage(dealerId, carId);
    return await carRepository.updateCar(carId, dto);
  }

  public async deleteCar(carId: string, dealerId: string): Promise<void> {
    await this.checkAbilityToManage(dealerId, carId);
    await carRepository.deleteCar(carId);
  }

  private async checkAbilityToManage(
    dealerId: string,
    manageCarId: string,
  ): Promise<ICar> {
    const car = await carRepository.getOneByParams({
      _dealerId: dealerId,
      _id: manageCarId,
    });
    if (!car) {
      throw new ApiError("U can not manage this car", 403);
    }
    return car;
  }
}

export const carService = new CarService();
