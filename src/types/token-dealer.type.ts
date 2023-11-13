import { Document, Types } from "mongoose";

import { IDealer } from "./dealer.type";
import { IPremium } from "./premium.type";

export interface ITokenDealerPayload {
  dealerId: string;
  name: string;
}

export interface INewTokenPremiumPayload {
  premiumId: string;
  password: string;
}

export interface ITokensDealerPair {
  accessToken: string;
  refreshToken: string;
}

export interface INewTokensPremiumPair {
  newAccessToken?: string;
}

export interface ITokenDealer extends Document {
  accessToken: string;
  refreshToken: string;
  _dealerId: Types.ObjectId | IDealer;
}
export interface INewTokenPremium extends Document {
  newAccessToken: string;
  _premiumId: Types.ObjectId | IPremium;
}
