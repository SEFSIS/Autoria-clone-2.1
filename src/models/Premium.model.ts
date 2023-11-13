import { model, Schema, Types } from "mongoose";

import { IPremium } from "../types/premium.type";
import { Dealer } from "./Dealer.model";

const premiumSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    bank_card: {
      type: String,
      required: true,
    },
    buy: {
      type: Boolean,
      required: true,
    },
    _dealerId: {
      type: Types.ObjectId,
      required: true,
      ref: Dealer,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Premium = model<IPremium>("premium", premiumSchema);
