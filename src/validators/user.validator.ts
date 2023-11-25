import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { ECity } from "../enums/city.enum";
import { EGenders } from "../enums/gender.enum";
import { ERoles } from "../enums/role.enum";

export class UserValidator {
  static firstName = joi.string().min(3).max(20).trim();
  static surname = joi.string().min(3).max(20).trim();
  static role = joi.valid(...Object.values(ERoles));
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
    city: this.city,
    phone: this.phone,
    email: this.email,
  });
  static wallet = joi.number().min(1).max(1000000);

  static register = joi.object({
    name: this.firstName.required(),
    surname: this.surname.required(),
    role: this.role.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
    city: this.city.required(),
    phone: this.phone.required(),
    wallet: this.wallet.required(),
  });

  static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
  static forgotPassword = joi.object({
    email: this.email.required(),
  });

  static setForgotPassword = joi.object({
    newPassword: this.password.required(),
  });

  static setNewPassword = joi.object({
    password: this.password.required(),
    newPassword: this.password.required(),
  });
}
