import { ApiError } from "../errors/api.error";
import { clientRepository } from "../repositories/client.repository";
import { tokenClientRepository } from "../repositories/token-client.repository";
import { IClientCredentials } from "../types/client.type";
import {
  ITokenClientPayload,
  ITokensClientPair,
} from "../types/token-client.type";
import { passwordService } from "./password.service";
import { tokenClientService } from "./token-client.service";

class AuthClientService {
  public async register(dto: IClientCredentials): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(dto.password);
      await clientRepository.register({ ...dto, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(dto: IClientCredentials): Promise<ITokensClientPair> {
    try {
      const client = await clientRepository.getOneByParams({
        email: dto.email,
      });
      if (!client) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const isMatched = await passwordService.compare(
        dto.password,
        client.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      const tokensClientPair = await tokenClientService.generateTokenClientPair(
        {
          clientId: client._id,
          name: client.name,
        },
      );
      await tokenClientRepository.create({
        ...tokensClientPair,
        _clientId: client._id,
      });

      return tokensClientPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    payload: ITokenClientPayload,
    refreshToken: string,
  ): Promise<ITokensClientPair> {
    try {
      const tokensPair = tokenClientService.generateTokenClientPair({
        clientId: payload.clientId,
        name: payload.name,
      });

      await Promise.all([
        tokenClientRepository.create({
          ...tokensPair,
          _clientId: payload.clientId,
        }),
        tokenClientRepository.deleteOne({ refreshToken }),
      ]);

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authClientService = new AuthClientService();
