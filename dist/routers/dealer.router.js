"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealerRouter = void 0;
const express_1 = require("express");
const dealer_controller_1 = require("../controllers/dealer.controller");
const common_middleware_1 = require("../middlewares/common.middleware");
const dealer_middleware_1 = require("../middlewares/dealer.middleware");
const dealer_validator_1 = require("../validators/dealer.validator");
const router = (0, express_1.Router)();
router.get("/", dealer_controller_1.dealerController.getAll);
router.get("/:dealerId", common_middleware_1.commonMiddleware.isIdValid("dealerId"), dealer_middleware_1.dealerMiddleware.getByIdOrThrow, dealer_controller_1.dealerController.getById);
router.put("/:dealerId", common_middleware_1.commonMiddleware.isIdValid("dealerId"), common_middleware_1.commonMiddleware.isBodyValid(dealer_validator_1.DealerValidator.update), dealer_controller_1.dealerController.updateDealer);
router.delete("/:dealerId", common_middleware_1.commonMiddleware.isIdValid("dealerId"), dealer_controller_1.dealerController.deleteDealer);
exports.dealerRouter = router;