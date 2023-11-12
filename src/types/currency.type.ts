import { Document } from "mongoose";

import { ECurrency } from "../enums/currency.enum";

export interface ICurrency extends Document {
  fromCurrency?: ECurrency;
  toCurrency?: ECurrency;
  amount?: number;
  exchangeAmount?: number;
}
