import { ObjectId } from "mongodb";

import { EActionTokenType } from "../enums/actionTokenType.enum";
import { EEmailAction } from "../enums/email.action.enum";
import { EStatus } from "../enums/status.enum";
import { ApiError } from "../errors/api.error";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { ITokenPayload, ITokensPair } from "../types/token.type";
import { ISetNewPassword, IUser, IUserCredentials } from "../types/user.type";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(dto: IUserCredentials): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(dto.password);

      const user = await userRepository.register({
        ...dto,
        password: hashedPassword,
      });
      const actionToken = tokenService.generateActionToken(
        {
          userId: user._id,
          name: user.name,
        },
        EActionTokenType.activate,
      );
      await actionTokenRepository.create({
        token: actionToken,
        type: EActionTokenType.activate,
        _userId: user._id,
      });
      await emailService.sendMail(dto.email, EEmailAction.REGISTER, {
        name: dto.name,
        actionToken,
      });
    } catch (e) {
      throw new ApiError(e.messages, e.status);
    }
  }

  public async login(dto: IUserCredentials): Promise<ITokensPair> {
    try {
      const user = await userRepository.getOneByParams({ email: dto.email });
      if (!user) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const isMatched = await passwordService.compare(
        dto.password,
        user.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const tokensPair = tokenService.generateTokenPair({
        userId: user._id,
        name: user.name,
        role: user.role,
        status: user.status,
        wallet: user.wallet,
      });
      await tokenRepository.create({ ...tokensPair, _userId: user._id });

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    payload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokensPair> {
    try {
      const tokensPair = tokenService.generateTokenPair({
        userId: payload.userId,
        name: payload.name,
      });

      await Promise.all([
        tokenRepository.create({
          ...tokensPair,
          _userId: new ObjectId(payload.userId),
        }),
        tokenRepository.deleteOne({ refreshToken }),
      ]);

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async logout(accessToken: string): Promise<void> {
    try {
      await tokenRepository.deleteOne({ accessToken });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async logoutAll(userId: string): Promise<void> {
    try {
      await tokenRepository.deleteManyByUserId(userId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activate(token: string): Promise<void> {
    try {
      const payload = tokenService.checkActionToken(
        token,
        EActionTokenType.activate,
      );
      const entity = await actionTokenRepository.findOne({ token });
      if (!entity) {
        throw new ApiError("Not valid token", 400);
      }

      const user = await userRepository.findById(payload.userId);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      if (user.wallet < 1000) {
        throw new ApiError("No money to activate premium account", 400);
      }

      await Promise.all([
        actionTokenRepository.deleteManyByUserIdAndType(
          payload.userId,
          EActionTokenType.activate,
        ),
        userRepository.setStatus(payload.userId, EStatus.premium),
        userRepository.updateWallet(payload.userId, -1000),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async sendActivationToken(tokenPayload: ITokenPayload): Promise<void> {
    try {
      const user = await userRepository.findById(tokenPayload.userId);
      if (user.status !== EStatus.base) {
        throw new ApiError("User can not be activated", 403);
      }

      const actionToken = tokenService.generateActionToken(
        {
          userId: user._id,
          name: user.name,
        },
        EActionTokenType.activate,
      );
      await actionTokenRepository.create({
        token: actionToken,
        type: EActionTokenType.activate,
        _userId: user._id,
      });
      await emailService.sendMail(user.email, EEmailAction.REGISTER, {
        name: user.name,
        actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        {
          userId: user._id,
        },
        EActionTokenType.forgotPassword,
      );

      await Promise.all([
        actionTokenRepository.create({
          token: actionToken,
          type: EActionTokenType.forgotPassword,
          _userId: user._id,
        }),
        emailService.sendMail(user.email, EEmailAction.FORGOT_PASSWORD, {
          name: user.name,
          actionToken,
        }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotPassword(
    actionToken: string,
    newPassword: string,
  ): Promise<void> {
    try {
      const payload = tokenService.checkActionToken(
        actionToken,
        EActionTokenType.forgotPassword,
      );
      const entity = await actionTokenRepository.findOne({
        token: actionToken,
      });
      if (!entity) {
        throw new ApiError("Not valid token", 400);
      }

      const newHashedPassword = await passwordService.hash(newPassword);

      await Promise.all([
        userRepository.updateOneById(payload.userId, {
          password: newHashedPassword,
        }),
        actionTokenRepository.deleteOne({ token: actionToken }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async setNewPassword(
    body: ISetNewPassword,
    userId: string,
  ): Promise<void> {
    try {
      const user = await userRepository.findById(userId);

      const isMatch = await passwordService.compare(
        body.password,
        user.password,
      );
      if (!isMatch) {
        throw new ApiError("Invalid password", 400);
      }
      const password = await passwordService.hash(body.newPassword);

      await Promise.all([
        userRepository.updateOneById(userId, { password }),
        this.logoutAll(userId),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
