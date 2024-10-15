"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetail = exports.loginUser = exports.registerUser = void 0;
const user_dao_1 = require("../dao/user-dao");
const util_1 = require("../utils/util");
// Create new user
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phoneNumber, address } = req.body;
    try {
        const credentialDetails = yield (0, user_dao_1.createUser)({ name, email, password, phoneNumber, address });
        return util_1.Util.sendSuccess(res, credentialDetails, "user registered successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const credentialDetails = yield (0, user_dao_1.login)({ email, password });
        return util_1.Util.sendSuccess(res, credentialDetails, "user login successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const userDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const credentialDetails = yield (0, user_dao_1.userDetails)(userId);
        return util_1.Util.sendSuccess(res, credentialDetails, "user login successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.userDetail = userDetail;
