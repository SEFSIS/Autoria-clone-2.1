import { Document, Types } from "mongoose";

import { IClient } from "./client.type";

export interface ITokenClientPayload {
  clientId: Types.ObjectId;
  name: string;
}

export interface ITokensClientPair {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenClient extends Document {
  accessToken: string;
  refreshToken: string;
  _clientId: Types.ObjectId | IClient;
}
