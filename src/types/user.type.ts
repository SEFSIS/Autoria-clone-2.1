import { Document } from "mongoose";

import { ECity } from "../enums/city.enum";
import { EGenders } from "../enums/gender.enum";
import { ERoles } from "../enums/role.enum";
import { EStatus } from "../enums/status.enum";

export interface IUser extends Document {
  name?: string;
  surname?: string;
  age?: number;
  gender?: EGenders;
  email?: string;
  password?: string;
  phone?: string;
  city?: ECity;
  role?: ERoles;
  status?: EStatus;
}

export type IUserCredentials = Pick<IUser, "name"| "role" | "email" | "password">;
