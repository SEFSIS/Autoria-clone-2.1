"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authDealerService = void 0;
const api_error_1 = require("../errors/api.error");
const dealer_repository_1 = require("../repositories/dealer.repository");
const token_dealer_repository_1 = require("../repositories/token-dealer.repository");
const password_service_1 = require("./password.service");
const token_dealer_service_1 = require("./token-dealer.service");
class AuthDealerService {
    async register(dto) {
        try {
            const hashedPassword = await password_service_1.passwordService.hash(dto.password);
            await dealer_repository_1.dealerRepository.register({ ...dto, password: hashedPassword });
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
    async login(dto) {
        try {
            const dealer = await dealer_repository_1.dealerRepository.getOneByParams({
                email: dto.email,
            });
            if (!dealer) {
                throw new api_error_1.ApiError("Invalid credentials provided", 401);
            }
            const isMatched = await password_service_1.passwordService.compare(dto.password, dealer.password);
            if (!isMatched) {
                throw new api_error_1.ApiError("Invalid credentials provided", 401);
            }
            const tokensDealerPair = await token_dealer_service_1.tokenDealerService.generateTokenDealerPair({
                dealerId: dealer._id,
                name: dealer.name,
            });
            await token_dealer_repository_1.tokenDealerRepository.create({
                ...tokensDealerPair,
                _dealerId: dealer._id,
            });
            return tokensDealerPair;
        }
        catch (e) {
            throw new api_error_1.ApiError(e.message, e.status);
        }
    }
}
exports.authDealerService = new AuthDealerService();
