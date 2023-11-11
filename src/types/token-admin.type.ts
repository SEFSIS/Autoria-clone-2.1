import { Document, Types } from "mongoose";

import { IAdmin } from "./admin.type";

export interface ITokenAdminPayload {
  adminId: string;
  name: string;
}

export interface ITokensAdminPair {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenAdmin extends Document {
  accessToken: string;
  refreshToken: string;
  _adminId: Types.ObjectId | IAdmin;
}
