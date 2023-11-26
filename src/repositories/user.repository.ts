import { FilterQuery } from "mongoose";

import { User } from "../models/User.model";
import { IQuery } from "../types/pagination.type";
import { IUser, IUserCredentials } from "../types/user.type";

class UserRepository {
  public async getMany(query: IQuery): Promise<[IUser[], number]> {
    const queryStr = JSON.stringify(query);
    const queryObj = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    );

    const { page, limit, sortedBy, ...searchObject } = queryObj;

    const skip = +limit * (+page - 1);

    return await Promise.all([
      User.find(searchObject).limit(+limit).skip(skip).sort(sortedBy),
      User.count(searchObject),
    ]);
  }

  public async updateOneById(
    userId: string,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }

  public async findById(id: string): Promise<IUser> {
    return await User.findById(id);
  }

  public async register(dto: IUserCredentials): Promise<IUser> {
    return await User.create(dto);
  }

  public async updateUser(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  public async deleteUser(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }

  public async setStatus(userId: string, status: any): Promise<void> {
    await User.updateOne({ _id: userId }, { $set: { status } });
  }

  async updateWallet(userId: string, amount: number): Promise<void> {
    await User.updateOne({ _id: userId }, { $inc: { wallet: amount } });
  }
}

export const userRepository = new UserRepository();
