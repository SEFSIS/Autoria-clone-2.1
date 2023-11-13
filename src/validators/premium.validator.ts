import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class PremiumValidator {
  static buy = joi.boolean().truthy("yes").falsy("no").sensitive(false);
  static bank_card = joi.string().regex(regexConstant.BANK_CARD);
  static password = joi.string().regex(regexConstant.PASSWORD).trim();

  static create = joi.object({
    buy: this.buy.required(),
    bank_card: this.bank_card.required(),
    password: this.password.required(),
  });
  static login = joi.object({
    password: this.password.required(),
  });
}
