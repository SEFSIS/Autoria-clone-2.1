import { model, Schema, Types } from "mongoose";

import { ITokenManager } from "../types/token-manager.type";
import { Manager } from "./Manager.model";

const tokensManagerSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    _managerId: {
      type: Types.ObjectId,
      required: true,
      ref: Manager,
    },
  },
  { timestamps: true, versionKey: false },
);

export const TokenManager = model<ITokenManager>(
  "token-manager",
  tokensManagerSchema,
);
