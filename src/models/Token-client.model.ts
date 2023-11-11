import { model, Schema, Types } from "mongoose";

import { ITokenClient } from "../types/token-client.type";
import { Client } from "./Client.model";

const tokensClientSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    _clientId: {
      type: Types.ObjectId,
      required: true,
      ref: Client,
    },
  },
  { timestamps: true, versionKey: false },
);

export const TokenClient = model<ITokenClient>("token-client", tokensClientSchema);
