import { Document } from "mongoose";

import { ECity } from "../enums/city.enum";
import { EGenders } from "../enums/gender.enum";
import {EStatus} from "../enums/status.enum";

export interface IDealer extends Document {
  name?: string;
  surname?: string;
  age?: number;
  gender?: EGenders;
  email?: string;
  phone?: string;
  city?: ECity;
  sole_trader?: boolean;
  vat_id?: string;
  password?: string;
  status?: EStatus;
}

export type IDealerCredentials = Pick<IDealer, "email" | "password">;
