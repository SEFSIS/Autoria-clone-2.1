import { model, Schema, Types } from "mongoose";

import { Dealer } from "./Dealer.model";
import {IPremium} from "../types/premium.type";

const premiumSchema = new Schema(
  {
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
