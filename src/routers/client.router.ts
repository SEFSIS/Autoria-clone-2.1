import { Router } from "express";

import { clientController } from "../controllers/client.controller";
import { authClientMiddleware } from "../middlewares/auth-client.middleware";
import { clientMiddleware } from "../middlewares/client.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ClientValidator } from "../validators/client.validator";

const router = Router();
router.get("/", clientController.getAll);
router.get(
  "/:clientId",
  commonMiddleware.isIdValid("clientId"),
  clientMiddleware.getByIdOrThrow,
  clientController.getById,
);
router.put(
  "/:clientId",
  authClientMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("clientId"),
  commonMiddleware.isBodyValid(ClientValidator.update),
  clientController.updateClient,
);
router.delete(
  "/:clientId",
  commonMiddleware.isIdValid("clientId"),
  clientController.deleteClient,
);
export const clientRouter = router;
