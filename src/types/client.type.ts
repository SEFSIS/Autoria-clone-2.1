import { Document } from "mongoose";

import { ECity } from "../enums/city.enum";
import { EGenders } from "../enums/gender.enum";

export interface IClient extends Document {
  name?: string;
  surname?: string;
  age?: number;
  gender?: EGenders;
  email?: string;
  phone?: string;
  city?: ECity;
  password?: string;
}
