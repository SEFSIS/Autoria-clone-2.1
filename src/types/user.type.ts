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
  wallet?: number;
}

export type IUserCredentials = Pick<
  IUser,
  "status" | "wallet" | "name" | "role" | "email" | "password"
>;
export interface ISetNewPassword extends Pick<IUser, "password"> {
  newPassword: string;
}
