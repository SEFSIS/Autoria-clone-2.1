import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { clientRepository } from "../repositories/client.repository";

class ClientMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { clientId } = req.params;

      const client = await clientRepository.findById(clientId);

      if (!client) {
        throw new ApiError("Client not found", 404);
      }

      req.res.locals = client;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const clientMiddleware = new ClientMiddleware();
