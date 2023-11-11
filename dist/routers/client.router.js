"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRouter = void 0;
const express_1 = require("express");
const client_controller_1 = require("../controllers/client.controller");
const auth_admin_middleware_1 = require("../middlewares/auth-admin.middleware");
const auth_client_middleware_1 = require("../middlewares/auth-client.middleware");
const auth_dealer_middleware_1 = require("../middlewares/auth-dealer.middleware");
const auth_manager_middleware_1 = require("../middlewares/auth-manager.middleware");
const client_middleware_1 = require("../middlewares/client.middleware");
const common_middleware_1 = require("../middlewares/common.middleware");
const client_validator_1 = require("../validators/client.validator");
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    auth_manager_middleware_1.authManagerMiddleware.checkAccessToken(req, res, (err) => {
        if (!err)
            return next();
        auth_admin_middleware_1.authAdminMiddleware.checkAccessToken(req, res, next);
    });
}, client_controller_1.clientController.getAll);
router.get("/me", auth_client_middleware_1.authClientMiddleware.checkAccessToken, client_controller_1.clientController.getMe);
router.get("/:clientId", common_middleware_1.commonMiddleware.isIdValid("clientId"), client_middleware_1.clientMiddleware.getByIdOrThrow, client_controller_1.clientController.getById);
router.put("/:clientId", (req, res, next) => {
    auth_dealer_middleware_1.authDealerMiddleware.checkAccessToken(req, res, (err) => {
        if (!err)
            return next();
        auth_manager_middleware_1.authManagerMiddleware.checkAccessToken(req, res, (err) => {
            if (!err)
                return next();
            auth_admin_middleware_1.authAdminMiddleware.checkAccessToken(req, res, next);
        });
    });
}, common_middleware_1.commonMiddleware.isIdValid("clientId"), common_middleware_1.commonMiddleware.isBodyValid(client_validator_1.ClientValidator.update), client_controller_1.clientController.updateClient);
router.delete("/:clientId", (req, res, next) => {
    auth_manager_middleware_1.authManagerMiddleware.checkAccessToken(req, res, (err) => {
        if (!err)
            return next();
        auth_admin_middleware_1.authAdminMiddleware.checkAccessToken(req, res, next);
    });
}, common_middleware_1.commonMiddleware.isIdValid("clientId"), client_controller_1.clientController.deleteClient);
exports.clientRouter = router;
