import joi from "joi";

import { EBrand } from "../enums/brand.enum";
import {ECity} from "../enums/city.enum";

const currentYear = new Date().getFullYear();

export class CarValidator {
  static brand = joi.valid(...Object.values(EBrand));
  static modelka = joi.string().min(3).max(20).trim();
  static year = joi.number().min(1990).max(currentYear);
  static color = joi.string().min(3).max(20).trim();
  static number_of_owners = joi.number().min(1).max(5);
  static insurance = joi.boolean().truthy("yes").falsy("no").sensitive(false);
  static price = joi.number().min(1000).max(5000);
  static city = joi.valid(...Object.values(ECity));

  static create = joi.object({
    brand: this.brand.required(),
    modelka: this.modelka.required(),
    year: this.year.required(),
    color: this.color.required(),
    number_of_owners: this.number_of_owners.required(),
    insurance: this.insurance.required(),
    price: this.price.required(),
    city: this.city.required(),
  });
  static update = joi.object({
    modelka: this.modelka,
    year: this.year,
    color: this.color,
    number_of_owners: this.number_of_owners,
    insurance: this.insurance,
    price: this.price,
  });
}
