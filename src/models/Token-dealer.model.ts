import { model, Schema, Types } from "mongoose";

import { ITokenDealer } from "../types/token-dealer.type";
import { Dealer } from "./Dealer.model";

const tokensDealerSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    _dealerId: {
      type: Types.ObjectId,
      required: true,
      ref: Dealer,
    },
  },
  { timestamps: true, versionKey: false },
);

export const TokenDealer = model<ITokenDealer>("token", tokensDealerSchema);
