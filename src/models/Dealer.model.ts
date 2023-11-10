import { model, Schema } from "mongoose";

import { ECity } from "../enums/city.enum";
import { EGenders } from "../enums/gender.enum";
import { IDealer } from "../types/dealer.type";

const dealerSchema = new Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    age: {
      type: Number,
      min: [1, "Minimum age is 1"],
      max: [199, "Maximum age is 199"],
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      enum: ECity,
    },
    sole_trader: {
      type: Boolean,
      required: true,
    },
    vat_id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Dealer = model<IDealer>("dealer", dealerSchema);
