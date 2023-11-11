import { Document } from "mongoose";

export interface IPremium extends Document {
  bank_card?: string;
  buy?: boolean;
}
