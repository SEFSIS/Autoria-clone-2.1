import { Document, Types } from "mongoose";

import { IManager } from "./manager.type";

export interface ITokenManagerPayload {
  managerId: Types.ObjectId;
  name: string;
}

export interface ITokensManagerPair {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenManager extends Document {
  accessToken: string;
  refreshToken: string;
  _managerId: Types.ObjectId | IManager;
}
