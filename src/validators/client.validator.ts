import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { ECity } from "../enums/city.enum";
import { EGenders } from "../enums/gender.enum";

export class ClientValidator {
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
  static city = joi.valid(...Object.values(ECity));
  static password = joi.string().regex(regexConstant.PASSWORD).trim();

  static update = joi.object({
    age: this.age,
    gender: this.gender,
    phone: this.phone,
    email: this.email,
    city: this.city,
  });

  static register = joi.object({
    name: this.firstName.required(),
    surname: this.surname.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    phone: this.phone.required(),
    email: this.email.required(),
    city: this.city.required(),
    password: this.password.required(),
  });
}
