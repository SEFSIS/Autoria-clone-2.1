import joi from "joi";

export class CheckValidator {
  static price = joi.number().min(1).max(10000000);
  static carId = joi.string();

  static create = joi.object({
    price: this.price.required(),
    carId: this.carId.required(),
  });
}
