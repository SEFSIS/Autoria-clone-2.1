
import { EBrand } from "../enums/brand.enum";
import { ECity } from "../enums/city.enum";
import { EEmailAction } from "../enums/email.enum";
import { ApiError } from "../errors/api.error";
import { carRepository } from "../repositories/car.repository";
import { ICar } from "../types/car.type";
import { emailService } from "./email.service";

class CarService {
  public async getAll(): Promise<ICar[]> {
    return await carRepository.getAll();
  }

  public async createCar(dto: ICar, dealerId: string): Promise<ICar> {
    const { brand } = dto;

    // Параметри для відправки листа
    const emailAction = EEmailAction.NOTBRAND;
    const context = { message: "Такої моделі нема" };

    try {
      if (!Object.values(EBrand).includes(brand)) {
        // Якщо бренд не в списку дозволених, відправляємо листа
        await emailService.sendMail(emailAction, context);
      }

      // Спробувати створити автомобіль
      return await carRepository.createCar(dto, dealerId);
    } catch (error) {
      // Обробка помилок при створенні автомобіля
      // Якщо виникає помилка, надішліть електронний лист і прокиньте її вгору
      await emailService.sendMail(emailAction, context);
      throw error;
    }
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

  public async getById(carId: string): Promise<ICar> {
    // Отримати автомобіль
    const car = await carRepository.findById(carId);
    if (!car) {
      throw new ApiError("Car not found", 404);
    }

    // Збільшити кількість переглядів
    await carRepository.incrementViews(carId);

    return car;
  }

  public async getAveragePriceByCity(city: ECity): Promise<number> {
    return await carRepository.getAveragePriceByCity(city);
  }

  public async getAveragePriceForAllCities(): Promise<number> {
    return await carRepository.getAveragePriceForAllCities();
  }
}

export const carService = new CarService();
