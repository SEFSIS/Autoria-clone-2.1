import { TokenAdmin } from "../models/Token-admin.model";
import { ITokenAdmin } from "../types/token-admin.type";

export class TokenAdminRepository {
  public async create(dto: Partial<ITokenAdmin>): Promise<ITokenAdmin> {
    return (await TokenAdmin.create(dto)) as ITokenAdmin;
  }
}

export const tokenAdminRepository = new TokenAdminRepository();
