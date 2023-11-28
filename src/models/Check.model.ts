import { model, Schema, Types } from "mongoose";

import { ICheck } from "../types/check.type";
import { User } from "./User.model";

const checkSchema = new Schema(
  {
    price: {
      type: Number,
    },
    carId: {
      type: String,
      required: true,
    },
    success: {
      type: Boolean,
      default: true,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Check = model<ICheck>("check", checkSchema);
