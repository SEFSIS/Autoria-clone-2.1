import { FilterQuery } from "mongoose";

import { TokenAdmin } from "../models/Token-admin.model";
import { ITokenAdmin } from "../types/token-admin.type";

export class TokenAdminRepository {
  public async create(dto: Partial<ITokenAdmin>): Promise<ITokenAdmin> {
    return (await TokenAdmin.create(dto)) as ITokenAdmin;
  }
  public async findOne(params: FilterQuery<ITokenAdmin>): Promise<ITokenAdmin> {
    return await TokenAdmin.findOne(params);
  }

  public async deleteOne(params: FilterQuery<ITokenAdmin>): Promise<void> {
    await TokenAdmin.deleteOne(params);
  }
}

export const tokenAdminRepository = new TokenAdminRepository();
