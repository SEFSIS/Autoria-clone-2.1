import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { managerRepository } from "../repositories/manager.repository";

class ManagerMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { managerId } = req.params;

      const manager = await managerRepository.findById(managerId);

      if (!manager) {
        throw new ApiError("Manager not found", 404);
      }

      req.res.locals = manager;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const managerMiddleware = new ManagerMiddleware();
