import { model, Schema, Types } from "mongoose";

import { EBrand } from "../enums/brand.enum";
import { ECarStatus } from "../enums/car.status.enum";
import { ECity, ECityString } from "../enums/city.enum";
import { ICar } from "../types/car.type";
import { User } from "./User.model";

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
    city: {
      type: String,
      enum: Object.keys(ECity) as ECityString[],
      required: true,
    },
    avatar: {
      type: String,
    },
    status: {
      type: String,
      enum: ECarStatus,
      required: true,
      default: ECarStatus.active,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
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
