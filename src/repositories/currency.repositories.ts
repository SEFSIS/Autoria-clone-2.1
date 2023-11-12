import { Currency } from "../models/Currency.model";
import { ICurrency } from "../types/currency.type";

class CurrencyRepository {
  public async getAll(): Promise<ICurrency[]> {
    return await Currency.find().populate("_clientId");
  }
  public async createCurrency(
    dto: ICurrency,
    clientId: string,
  ): Promise<ICurrency> {
    return await (
      await Currency.create({ ...dto, _clientId: clientId })
    ).populate("_clientId");
  }
}

export const currencyRepository = new CurrencyRepository();
