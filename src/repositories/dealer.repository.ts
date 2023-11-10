import { FilterQuery } from "mongoose";

import { Dealer } from "../models/Dealer.model";
import { IDealer, IDealerCredentials } from "../types/dealer.type";

class DealerRepository {
  public async getAll(): Promise<IDealer[]> {
    return await Dealer.find();
  }

  public async getOneByParams(params: FilterQuery<IDealer>): Promise<IDealer> {
    return await Dealer.findOne(params);
  }

  public async findById(id: string): Promise<IDealer> {
    return await Dealer.findById(id);
  }

  public async updateDealer(
    dealerId: string,
    dto: Partial<IDealer>,
  ): Promise<IDealer> {
    return await Dealer.findByIdAndUpdate(dealerId, dto, {
      returnDocument: "after",
    });
  }

  public async register(dto: IDealerCredentials): Promise<IDealer> {
    return await Dealer.create(dto);
  }

  public async deleteDealer(dealerId: string): Promise<void> {
    await Dealer.deleteOne({ _id: dealerId });
  }
}

export const dealerRepository = new DealerRepository();
