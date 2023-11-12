import { model, Schema, Types } from "mongoose";

import { ECurrency } from "../enums/currency.enum";
import { ICurrency } from "../types/currency.type";
import { Client } from "./Client.model";

const currencySchema = new Schema(
  {
    fromCurrency: {
      type: String,
      enum: ECurrency,
      required: true,
    },

    toCurrency: {
      type: String,
      enum: ECurrency,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    exchangeAmount: { type: Number, default: 0 },

    _clientId: {
      type: Types.ObjectId,
      required: true,
      ref: Client,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Currency = model<ICurrency>("currency", currencySchema);
