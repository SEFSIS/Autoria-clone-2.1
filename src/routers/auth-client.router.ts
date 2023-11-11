import { Router } from "express";

import { authClientController } from "../controllers/auth-client.controller";
import { authClientMiddleware } from "../middlewares/auth-client.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ClientValidator } from "../validators/client.validator";

const router = Router();

router.post(
  "/register-client",
  commonMiddleware.isBodyValid(ClientValidator.register),
  authClientController.register,
);
router.post("/login-client", authClientController.login);

router.post(
  "/refresh-client",
  authClientMiddleware.checkRefreshToken,
  authClientController.refresh,
);
export const authClientRouter = router;
