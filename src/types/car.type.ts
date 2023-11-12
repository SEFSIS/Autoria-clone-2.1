import { Document } from "mongoose";

import { EBrand } from "../enums/brand.enum";
import { ECity } from "../enums/city.enum";


export interface ICar extends Document {
  brand: EBrand;
  modelka?: string;
  year?: number;
  color?: string;
  number_of_owners?: string;
  insurance?: boolean;
  price?: number;
  city: ECity;
  views: number;
  lastViewedAt: Date;
  dailyViews: number;
  monthlyViews: number;
  yearlyViews: number;
}
