"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDealerRepository = exports.TokenDealerRepository = void 0;
const Token_dealer_model_1 = require("../models/Token-dealer.model");
class TokenDealerRepository {
    async create(dto) {
        return (await Token_dealer_model_1.TokenDealer.create(dto));
    }
}
exports.TokenDealerRepository = TokenDealerRepository;
exports.tokenDealerRepository = new TokenDealerRepository();
