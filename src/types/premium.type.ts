import { Document } from "mongoose";


export interface IPremium extends Document {
  bank_card?: string;
  buy?: boolean;
  password?: string;
}

export type IPremiumCredentials = Pick<IPremium, "buy" | "password">;