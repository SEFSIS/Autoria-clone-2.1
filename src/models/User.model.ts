import { model, Schema } from "mongoose";

import { ECity } from "../enums/city.enum";
import { EGenders } from "../enums/gender.enum";
import { ERoles } from "../enums/role.enum";
import { EStatus } from "../enums/status.enum";
import { IUser } from "../types/user.type";

const userSchema = new Schema(
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ERoles,
      required: true,
    },
    status: {
      type: String,
      enum: EStatus,
      required: true,
      default: EStatus.active,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUser>("user", userSchema);
