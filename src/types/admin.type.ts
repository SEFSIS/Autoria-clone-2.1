import { Document } from "mongoose";

import { EGenders } from "../enums/gender.enum";
import {EStatus} from "../enums/status.enum";

export interface IAdmin extends Document {
  name?: string;
  surname?: string;
  age?: number;
  gender?: EGenders;
  email?: string;
  phone?: string;
  partnership?: boolean;
  password?: string;
  status?: EStatus;
}

export type IAdminCredentials = Pick<IAdmin, "email" | "password">;
