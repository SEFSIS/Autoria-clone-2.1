import { Document } from "mongoose";

import { ECity } from "../enums/city.enum";
import { EGenders } from "../enums/gender.enum";
import {EStatus} from "../enums/status.enum";

export interface IClient extends Document {
  name?: string;
  surname?: string;
  age?: number;
  gender?: EGenders;
  email?: string;
  phone?: string;
  city?: ECity;
  password?: string;
  status?: EStatus;
}

export type IClientCredentials = Pick<IClient, "email" | "password">;
