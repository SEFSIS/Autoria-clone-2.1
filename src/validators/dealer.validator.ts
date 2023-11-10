import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { ECity } from "../enums/city.enum";
import { EGenders } from "../enums/gender.enum";

export class DealerValidator {
  static firstName = joi.string().min(3).max(20).trim();
  static surname = joi.string().min(3).max(20).trim();
  static age = joi.number().min(18).max(150);
  static gender = joi.valid(...Object.values(EGenders));
  static phone = joi.string().regex(regexConstant.PHONE);
  static email = joi
    .string()
    .regex(regexConstant.EMAIL)
    .trim()
    .messages({ "string.empty": "Email is not valid" });
  static sole_trader = joi.boolean().truthy("yes").falsy("no").sensitive(false);
  static vat_id = joi.string().regex(regexConstant.VAT_ID);
  static city = joi.valid(...Object.values(ECity));
  static password = joi.string().regex(regexConstant.PASSWORD).trim();

  static update = joi.object({
    age: this.age,
    gender: this.gender,
    city: this.city,
    phone: this.phone,
    email: this.email,
    sole_trader: this.sole_trader,
  });

  static register = joi.object({
    name: this.firstName.required(),
    surname: this.surname.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
    city: this.city.required(),
    phone: this.phone.required(),
    vat_id: this.vat_id.required(),
    sole_trader: this.sole_trader.required(),
  });

  static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
