import { model, Schema } from "mongoose";

import { EBrand } from "../enums/brand.enum";
import { ICar } from "../types/car.type";

const carSchema = new Schema(
  {
    brand: {
      type: String,
      enum: EBrand,
      required: true,
    },
    modelka: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    number_of_owners: {
      type: Number,
      required: true,
    },
    insurance: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model<ICar>("car", carSchema);
