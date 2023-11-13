import { Router } from "express";

import { authPremiumController } from "../controllers/auth-premium.controller";

const router = Router();

router.post("/login", authPremiumController.login);

export const authPremiumRouter = router;
