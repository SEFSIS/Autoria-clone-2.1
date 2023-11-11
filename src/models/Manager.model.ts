import { model, Schema } from "mongoose";

import { EGenders } from "../enums/gender.enum";
import { EStatus } from "../enums/status.enum";
import { IManager } from "../types/manager.type";

const managerSchema = new Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    age: {
      type: Number,
      min: [18, "Minimum age is 18"],
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
      type: String,
      required: true,
      unique: true,
    },
    education: {
      type: String,
    },
    experience: {
      type: String,
    },
    password: {
      type: String,
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

export const Manager = model<IManager>("manager", managerSchema);
