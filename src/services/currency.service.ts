import axios from "axios";

import { CurrencyRates, PrivatBankRate } from "../types/currency.type";

export async function getCurrencyRates(): Promise<CurrencyRates | null> {
  try {
    const response = await axios.get<PrivatBankRate[]>(
      "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
    );
    const data = response.data;

    const rates: CurrencyRates = {
      USD: parseFloat(data.find((rate) => rate.ccy === "USD")?.buy || "0"),
      EUR: parseFloat(data.find((rate) => rate.ccy === "EUR")?.buy || "0"),
      UAH: 1,
    };

    return rates;
  } catch (error) {
    console.error("Error fetching currency rates from PrivatBank:", error);
    return null;
  }
}
