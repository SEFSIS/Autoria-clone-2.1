import { dealerRepository } from "../repositories/dealer.repository";
import { IDealer } from "../types/dealer.type";

class DealerService {
  public async getAll(): Promise<IDealer[]> {
    return await dealerRepository.getAll();
  }

  public async updateDealer(
    dealerId: string,
    dto: Partial<IDealer>,
  ): Promise<IDealer> {
    return await dealerRepository.updateDealer(dealerId, dto);
  }

  public async deleteDealer(dealerId: string): Promise<void> {
    await dealerRepository.deleteDealer(dealerId);
  }
}

export const dealerService = new DealerService();
