"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealerRouter = void 0;
const express_1 = require("express");
const dealer_controller_1 = require("../controllers/dealer.controller");
const auth_admin_middleware_1 = require("../middlewares/auth-admin.middleware");
const auth_dealer_middleware_1 = require("../middlewares/auth-dealer.middleware");
const auth_manager_middleware_1 = require("../middlewares/auth-manager.middleware");
const common_middleware_1 = require("../middlewares/common.middleware");
const dealer_middleware_1 = require("../middlewares/dealer.middleware");
const dealer_validator_1 = require("../validators/dealer.validator");
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    auth_manager_middleware_1.authManagerMiddleware.checkAccessToken(req, res, (err) => {
        if (!err)
            return next();
        auth_admin_middleware_1.authAdminMiddleware.checkAccessToken(req, res, next);
    });
}, dealer_controller_1.dealerController.getAll);
router.get("/me", auth_dealer_middleware_1.authDealerMiddleware.checkAccessToken, dealer_controller_1.dealerController.getMe);
router.get("/:dealerId", (req, res, next) => {
    auth_manager_middleware_1.authManagerMiddleware.checkAccessToken(req, res, (err) => {
        if (!err)
            return next();
        auth_admin_middleware_1.authAdminMiddleware.checkAccessToken(req, res, next);
    });
}, common_middleware_1.commonMiddleware.isIdValid("dealerId"), dealer_middleware_1.dealerMiddleware.getByIdOrThrow, dealer_controller_1.dealerController.getById);
router.put("/:dealerId", (req, res, next) => {
    auth_manager_middleware_1.authManagerMiddleware.checkAccessToken(req, res, (err) => {
        if (!err)
            return next();
        auth_admin_middleware_1.authAdminMiddleware.checkAccessToken(req, res, next);
    });
}, auth_dealer_middleware_1.authDealerMiddleware.checkAccessToken, common_middleware_1.commonMiddleware.isIdValid("dealerId"), common_middleware_1.commonMiddleware.isBodyValid(dealer_validator_1.DealerValidator.update), dealer_controller_1.dealerController.updateDealer);
router.delete("/:dealerId", (req, res, next) => {
    auth_manager_middleware_1.authManagerMiddleware.checkAccessToken(req, res, (err) => {
        if (!err)
            return next();
        auth_admin_middleware_1.authAdminMiddleware.checkAccessToken(req, res, next);
    });
}, common_middleware_1.commonMiddleware.isIdValid("dealerId"), dealer_controller_1.dealerController.deleteDealer);
exports.dealerRouter = router;
