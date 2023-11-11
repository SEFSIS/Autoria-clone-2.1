import { NextFunction, Request, Response } from "express";

import { clientService } from "../services/client.service";
import { IClient } from "../types/client.type";
import { ITokenClientPayload } from "../types/token-client.type";

class ClientController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IClient[]>> {
    try {
      const clients = await clientService.getAll();

      return res.json(clients);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const client = req.res.locals;

      res.json(client);
    } catch (e) {
      next(e);
    }
  }

  public async deleteClient(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await clientService.deleteClient(req.params.clientId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async updateClient(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const client = await clientService.updateClient(
        req.params.clientId,
        req.body,
      );

      res.status(201).json(client);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { clientId } = req.res.locals.tokenPayload as ITokenClientPayload;
      const client = await clientService.getMe(clientId);

      res.json(client);
    } catch (e) {
      next(e);
    }
  }
}

export const clientController = new ClientController();
