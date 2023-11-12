import { currencyRepository } from "../repositories/currency.repositories";
import { ICurrency } from "../types/currency.type";

class CurrencyService {
  public async getAll(): Promise<ICurrency[]> {
    return await currencyRepository.getAll();
  }

  public async createCurrency(
    dto: ICurrency,
    clientId: string,
  ): Promise<ICurrency> {
    return await currencyRepository.createCurrency(dto, clientId);
  }
}

export const currencyService = new CurrencyService();
