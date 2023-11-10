import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { adminRepository } from "../repositories/admin.repository";

class AdminMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { adminId } = req.params;

      const admin = await adminRepository.findById(adminId);

      if (!admin) {
        throw new ApiError("Admin not found", 404);
      }

      req.res.locals = admin;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const adminMiddleware = new AdminMiddleware();
