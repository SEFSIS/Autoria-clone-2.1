import { Document, Types } from "mongoose";

import { IDealer } from "./dealer.type";

export interface ITokenDealerPayload {
  dealerId: Types.ObjectId;
  name: string;
}

export interface ITokensDealerPair {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenDealer extends Document {
  accessToken: string;
  refreshToken: string;
  _dealerId: Types.ObjectId | IDealer;
}
