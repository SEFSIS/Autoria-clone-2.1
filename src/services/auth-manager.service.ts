import { ApiError } from "../errors/api.error";
import { managerRepository } from "../repositories/manager.repository";
import { tokenManagerRepository } from "../repositories/token-manager.repository";
import { IManagerCredentials } from "../types/manager.type";
import {
  ITokenManagerPayload,
  ITokensManagerPair,
} from "../types/token-manager.type";
import { passwordService } from "./password.service";
import { tokenManagerService } from "./token-manager.service";

class AuthManagerService {
  public async register(dto: IManagerCredentials): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(dto.password);
      await managerRepository.register({ ...dto, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(dto: IManagerCredentials): Promise<ITokensManagerPair> {
    try {
      const manager = await managerRepository.getOneByParams({
        email: dto.email,
      });
      if (!manager) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const isMatched = await passwordService.compare(
        dto.password,
        manager.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      const tokensManagerPair =
        await tokenManagerService.generateTokenManagerPair({
          managerId: manager._id,
          name: manager.name,
        });
      await tokenManagerRepository.create({
        ...tokensManagerPair,
        _managerId: manager._id,
      });

      return tokensManagerPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    payload: ITokenManagerPayload,
    refreshToken: string,
  ): Promise<ITokensManagerPair> {
    try {
      const tokensPair = tokenManagerService.generateTokenManagerPair({
        managerId: payload.managerId,
        name: payload.name,
      });

      await Promise.all([
        tokenManagerRepository.create({
          ...tokensPair,
          _managerId: payload.managerId,
        }),
        tokenManagerRepository.deleteOne({ refreshToken }),
      ]);

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authManagerService = new AuthManagerService();
