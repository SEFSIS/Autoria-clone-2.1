import { Document } from "mongoose";

import { EGenders } from "../enums/gender.enum";
import { EStatus } from "../enums/status.enum";

export interface IManager extends Document {
  name?: string;
  surname?: string;
  age?: number;
  gender?: EGenders;
  email?: string;
  phone?: string;
  education?: string;
  experience?: string;
  password?: string;
  status?: EStatus;
}

export type IManagerCredentials = Pick<IManager, "email" | "password">;
