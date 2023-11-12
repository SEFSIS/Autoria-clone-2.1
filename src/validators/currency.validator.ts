import joi from "joi";

import { ECurrency } from "../enums/currency.enum";

export class CurrencyValidator {
  static amount = joi.number().min(1000).max(5000);
  static fromCurrency = joi.valid(...Object.values(ECurrency));
  static toCurrency = joi.valid(...Object.values(ECurrency));

  static create = joi.object({
    amount: this.amount.required(),
    fromCurrency: this.fromCurrency.required(),
    toCurrency: this.toCurrency.required(),
  });
}
