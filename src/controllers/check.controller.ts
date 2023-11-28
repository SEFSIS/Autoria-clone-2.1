import { NextFunction, Request, Response } from "express";

import { checkPresenter } from "../presenters/check.presenter";
import { checkService } from "../services/check.service";
import { ICheck } from "../types/check.type";
import { ITokenPayload } from "../types/token.type";

class CheckController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICheck[]>> {
    try {
      const checks = await checkService.getAll();

      const response = checks.map((check) => checkPresenter.present(check));

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
  public async createCheck(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;

      const check = await checkService.createCheck(req.body, userId);

      res.status(201).json(check);
    } catch (e) {
      next(e);
    }
  }
}

export const checkController = new CheckController();
