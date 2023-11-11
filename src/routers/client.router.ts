import { Router } from "express";

import { clientController } from "../controllers/client.controller";
import { authAdminMiddleware } from "../middlewares/auth-admin.middleware";
import { authClientMiddleware } from "../middlewares/auth-client.middleware";
import { authDealerMiddleware } from "../middlewares/auth-dealer.middleware";
import { authManagerMiddleware } from "../middlewares/auth-manager.middleware";
import { clientMiddleware } from "../middlewares/client.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ClientValidator } from "../validators/client.validator";

const router = Router();
router.get(
  "/",
  (req, res, next) => {
    authManagerMiddleware.checkAccessToken(req, res, (err) => {
      if (!err) return next();

      authAdminMiddleware.checkAccessToken(req, res, next);
    });
  },
  clientController.getAll,
);
router.get(
  "/me",
  authClientMiddleware.checkAccessToken,
  clientController.getMe,
);
router.get(
  "/:clientId",
  commonMiddleware.isIdValid("clientId"),
  clientMiddleware.getByIdOrThrow,
  clientController.getById,
);
router.put(
  "/:clientId",
  (req, res, next) => {
    authDealerMiddleware.checkAccessToken(req, res, (err) => {
      if (!err) return next();

      authManagerMiddleware.checkAccessToken(req, res, (err) => {
        if (!err) return next();

        authAdminMiddleware.checkAccessToken(req, res, next);
      });
    });
  },
  commonMiddleware.isIdValid("clientId"),
  commonMiddleware.isBodyValid(ClientValidator.update),
  clientController.updateClient,
);

router.delete(
  "/:clientId",
  (req, res, next) => {
    authManagerMiddleware.checkAccessToken(req, res, (err) => {
      if (!err) return next();

      authAdminMiddleware.checkAccessToken(req, res, next);
    });
  },
  commonMiddleware.isIdValid("clientId"),
  clientController.deleteClient,
);
export const clientRouter = router;
