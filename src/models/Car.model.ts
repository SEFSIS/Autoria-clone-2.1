import { model, Schema, Types } from "mongoose";

import { EBrand } from "../enums/brand.enum";
import { ECity, ECityString } from "../enums/city.enum";
import { EStatus } from "../enums/status.enum";
import { ICar } from "../types/car.type";
import { Dealer } from "./Dealer.model";


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
    status: {
      type: String,
      enum: EStatus,
      default: EStatus.active,
    },
    _dealerId: {
      type: Types.ObjectId,
      required: true,
      ref: Dealer,
    },
    city: {
      type: String,
      enum: Object.keys(ECity) as ECityString[],
      required: true,
    },
      avatar: {
      type: String,

    },
    views: { type: Number, default: 0 },
    lastViewedAt: { type: Date, default: Date.now },
    dailyViews: { type: Number, default: 0 },
    monthlyViews: { type: Number, default: 0 },
    yearlyViews: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model<ICar>("car", carSchema);
