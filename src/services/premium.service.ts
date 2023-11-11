import { premiumRepository } from "../repositories/premium.repisotory";
import { IPremium } from "../types/premium.type";

class PremiumService {
  public async getAll(): Promise<IPremium[]> {
    return await premiumRepository.getAll();
  }

  public async createPremium(
    dto: IPremium,
    dealerId: string,
  ): Promise<IPremium> {
    return await premiumRepository.createPremium(dto, dealerId);
  }
}

export const premiumService = new PremiumService();
