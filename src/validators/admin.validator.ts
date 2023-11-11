import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { EGenders } from "../enums/gender.enum";

export class AdminValidator {
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
  static partnership = joi.boolean().truthy("yes").falsy("no").sensitive(false);
  static password = joi.string().regex(regexConstant.PASSWORD).trim();

  static register = joi.object({
    name: this.firstName,
    surname: this.surname,
    age: this.age,
    gender: this.gender,
    phone: this.phone,
    email: this.email,
    partnership: this.partnership,
    password: this.password.required(),
  });
  static update = joi.object({
    age: this.age,
    gender: this.gender,
    phone: this.phone,
    email: this.email,
    partnership: this.partnership,
  });
}
