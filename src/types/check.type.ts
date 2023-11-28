import { Document, Types } from "mongoose";

import { IUser } from "./user.type";

export interface ICheck extends Document {
  price?: number;
  carId?: string;
  success?: boolean;
  _userId: Types.ObjectId | IUser["_id"];
}
