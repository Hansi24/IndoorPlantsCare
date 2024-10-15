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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetails = exports.login = exports.createUser = void 0;
const User_1 = __importDefault(require("../schema/User"));
const helper_1 = require("../utils/helper");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield User_1.default.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const hashedPassword = yield helper_1.Helper.hashPassword(userData.password);
        const newUser = new User_1.default(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        yield newUser.save();
        const token = helper_1.Helper.generateToken(newUser._id, newUser.role);
        return { token: token };
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
const login = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield User_1.default.findOne({ email: userData.email });
        if (!existingUser) {
            throw new Error('User not found');
        }
        const isPasswordValid = yield helper_1.Helper.comparePassword(userData.password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = helper_1.Helper.generateToken(existingUser._id, existingUser.role);
        return { token: token };
    }
    catch (error) {
        throw error;
    }
});
exports.login = login;
const userDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield User_1.default.findById(userId).select('-password');
        if (!existingUser) {
            throw new Error('User not found');
        }
        return existingUser;
    }
    catch (error) {
        throw error;
    }
});
exports.userDetails = userDetails;
