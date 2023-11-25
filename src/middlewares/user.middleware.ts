import { NextFunction, Request, Response } from "express";

import { ERoles } from "../enums/role.enum";
import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";

class UserMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await userRepository.findById(userId);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      req.res.locals = user;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isEmailUniq(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await userRepository.getOneByParams({ email });
      if (user) {
        throw new ApiError("Email already exist", 409);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async disallowManagerRole(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { role } = req.body;

      if (role && role.toLowerCase() === ERoles.Manager) {
        throw new ApiError("Role 'manager' is not allowed", 403);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
