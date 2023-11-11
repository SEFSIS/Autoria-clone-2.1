import { NextFunction, Request, Response } from "express";

import { adminService } from "../services/admin.service";
import { IAdmin } from "../types/admin.type";
import { ITokenAdminPayload } from "../types/token-admin.type";

class AdminController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IAdmin[]>> {
    try {
      const admins = await adminService.getAll();

      return res.json(admins);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const admin = req.res.locals;

      res.json(admin);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await adminService.deleteAdmin(req.params.adminId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async updateAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const admin = await adminService.updateAdmin(
        req.params.adminId,
        req.body,
      );

      res.status(201).json(admin);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { adminId } = req.res.locals.tokenPayload as ITokenAdminPayload;
      const admin = await adminService.getMe(adminId);

      res.json(admin);
    } catch (e) {
      next(e);
    }
  }
}

export const adminController = new AdminController();
