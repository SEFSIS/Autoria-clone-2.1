import { UploadedFile } from "express-fileupload";

import { EBrand } from "../enums/brand.enum";
import { EEmailAction } from "../enums/email.enum";
import { ApiError } from "../errors/api.error";
import { carRepository } from "../repositories/car.repository";
import { ICar } from "../types/car.type";
import { emailService } from "./email.service";
import { EFileTypes, s3Service } from "./s3.service";

class CarService {
  public async getAll(): Promise<ICar[]> {
    return await carRepository.getAll();
  }

  public async uploadAvatar(
    avatar: UploadedFile,
    carId: string,
  ): Promise<ICar> {
    const car = await carRepository.findById(carId);

    if (car.avatar) {
      await s3Service.deleteFile(car.avatar);
    }

    const filePath = await s3Service.uploadFile(avatar, EFileTypes.Car, carId);

    const updatedCar = await carRepository.updateOneById(carId, {
      avatar: filePath,
    });

    return updatedCar;
  }

  public async createCar(dto: ICar, dealerId: string): Promise<ICar> {
    const existingCar = await carRepository.getOneByParams({
      _dealerId: dealerId,
    });

    if (existingCar) {
      throw new Error("Дилер вже має створений автомобіль");
    }
    const { brand } = dto;

    const emailAction = EEmailAction.NOTBRAND;
    const context = { message: "Такої моделі нема" };

    try {
      if (!Object.values(EBrand).includes(brand)) {
        await emailService.sendMail(emailAction, context);
      }

      return await carRepository.createCar(dto, dealerId);
    } catch (error) {
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
    const car = await carRepository.findById(carId);
    if (!car) {
      throw new ApiError("Car not found", 404);
    }

    await carRepository.incrementViews(carId);

    return car;
  }
}

export const carService = new CarService();
