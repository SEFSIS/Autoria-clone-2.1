import { ApiError } from "../errors/api.error";
import {tokenAdminRepository} from "../repositories/token-admin.repository";
import {tokenAdminService} from "./token-admin.service";
import {passwordService} from "./password.service";
import {adminRepository} from "../repositories/admin.repository";
import {IAdminCredentials} from "../types/admin.type";
import {ITokensAdminPair} from "../types/token-admin.type";

class AuthAdminService {
  public async register(dto: IAdminCredentials): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(dto.password);
      await adminRepository.register({ ...dto, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(dto: IAdminCredentials): Promise<ITokensAdminPair> {
    try {
      const admin = await adminRepository.getOneByParams({
        email: dto.email,
      });
      if (!admin) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const isMatched = await passwordService.compare(
        dto.password,
        admin.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      const tokensAdminPair = await tokenAdminService.generateTokenAdminPair({
        adminId: admin._id,
        name: admin.name,
      });
      await tokenAdminRepository.create({
        ...tokensAdminPair,
        _adminId: admin._id,
      });

      return tokensAdminPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authAdminService = new AuthAdminService();
