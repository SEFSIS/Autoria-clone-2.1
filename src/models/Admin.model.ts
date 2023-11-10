import { model, Schema } from "mongoose";

import { EGenders } from "../enums/gender.enum";
import { IAdmin } from "../types/admin.type";

const adminSchema = new Schema(
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
      type: String,
      required: true,
      unique: true,
    },
    partnership: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Admin = model<IAdmin>("admin", adminSchema);
