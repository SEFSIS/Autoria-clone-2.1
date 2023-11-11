import { NextFunction, Request, Response } from "express";

import { managerService } from "../services/manager.service";
import { IManager } from "../types/manager.type";

class ManagerController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IManager[]>> {
    try {
      const managers = await managerService.getAll();

      return res.json(managers);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const manager = req.res.locals;

      res.json(manager);
    } catch (e) {
      next(e);
    }
  }

  public async deleteManager(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await managerService.deleteManager(req.params.managerId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async updateManager(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const manager = await managerService.updateManager(
        req.params.managerId,
        req.body,
      );

      res.status(201).json(manager);
    } catch (e) {
      next(e);
    }
  }
}

export const managerController = new ManagerController();
