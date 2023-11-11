import { model, Schema, Types } from "mongoose";

import { ITokenAdmin } from "../types/token-admin.type";
import { Admin } from "./Admin.model";

const tokensAdminSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    _adminId: {
      type: Types.ObjectId,
      required: true,
      ref: Admin,
    },
  },
  { timestamps: true, versionKey: false },
);

export const TokenAdmin = model<ITokenAdmin>("token-admin", tokensAdminSchema);
