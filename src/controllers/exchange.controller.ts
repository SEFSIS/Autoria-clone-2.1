import { Request, Response } from "express";

import { getCurrencyRates } from "../services/currency.service";
import { CurrencyRates } from "../types/currency.type";

let currencyRates: CurrencyRates = {
  USD: 1,
  EUR: 1,
  UAH: 1,
};

let lastUpdated: number = 0;

export async function handleExchangeRate(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { currency, price } = req.body as {
      currency: keyof CurrencyRates;
      price: number;
    };

    const currentTime = Date.now();
    const updateTime = 24 * 60 * 60 * 1000;

    if (currentTime - lastUpdated > updateTime) {
      const updatedRates = await getCurrencyRates();
      if (updatedRates) {
        currencyRates = updatedRates;
        lastUpdated = currentTime;
      }
    }

    if (!(currency in currencyRates)) {
      return res.status(400).json({ message: "Unsupported currency" });
    }

    const priceInUAH = price * currencyRates[currency]; // Use currencyRates directly

    return res.json({
      priceInUAH,
      exchangeRate: currencyRates[currency],
      userPrice: price,
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
