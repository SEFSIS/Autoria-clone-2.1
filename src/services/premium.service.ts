import { ECity } from "../enums/city.enum";
import { carRepository } from "../repositories/car.repository";
import { premiumRepository } from "../repositories/premium.repisotory";
import { IPremium } from "../types/premium.type";

class PremiumService {
  public async getAll(): Promise<IPremium[]> {
    return await premiumRepository.getAll();
  }

  public async createPremium(
    dto: IPremium,
    dealrId: string,
  ): Promise<IPremium> {
    return await premiumRepository.createPremium(dto, dealrId);
  }

  public async getAveragePriceByCity(city: ECity): Promise<number> {
    return await carRepository.getAveragePriceByCity(city);
  }

  public async getAveragePriceForAllCities(): Promise<number> {
    return await carRepository.getAveragePriceForAllCities();
  }
}

export const premiumService = new PremiumService();
