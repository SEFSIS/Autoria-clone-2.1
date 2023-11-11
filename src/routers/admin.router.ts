import { Router } from "express";

import { adminController } from "../controllers/admin.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AdminValidator } from "../validators/admin.validator";

const router = Router();
router.get("/", adminController.getAll);

router.get(
  "/:adminId",
  commonMiddleware.isIdValid("adminId"),
  adminMiddleware.getByIdOrThrow,
  adminController.getById,
);
router.put(
  "/:adminId",
  commonMiddleware.isIdValid("adminId"),
  commonMiddleware.isBodyValid(AdminValidator.update),
  adminController.updateAdmin,
);
router.delete(
  "/:adminId",
  commonMiddleware.isIdValid("adminId"),
  adminController.deleteAdmin,
);
export const adminRouter = router;
