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
exports.Helper = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config"); // assuming your JWT_SECRET is stored here
const crypto_1 = __importDefault(require("crypto"));
var Helper;
(function (Helper) {
    Helper.generateToken = (userId, userRole) => {
        const payload = { userId, userRole };
        const secretKey = config_1.config.JWT_SECRET;
        return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: config_1.config.JWT_EXPIRES_IN });
    };
    // 2. Verify JWT Token
    Helper.verifyToken = (req, res, next) => {
        const token = req.header('Authorization'); // Get token from the Authorization header
        if (!token) {
            res.status(401).json({ error: 'Access denied. No token provided.' });
            return;
        }
        try {
            const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
            const decoded = jsonwebtoken_1.default.verify(tokenWithoutBearer, config_1.config.JWT_SECRET);
            req.user = { userId: decoded.userId };
            next();
        }
        catch (error) {
            res.status(400).json({ error: 'Invalid or expired token' });
            return;
        }
    };
    // 3. Hash Password
    Helper.hashPassword = (password) => __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10); // Generate salt
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt); // Hash the password
        return hashedPassword;
    });
    // 4. Compare Password
    Helper.comparePassword = (password, hashedPassword) => __awaiter(this, void 0, void 0, function* () {
        console.log(password, hashedPassword);
        const isMatch = yield bcryptjs_1.default.compare(password, hashedPassword); // Compare password with hash
        return isMatch;
    });
    // 5. Generate Random String (e.g., for generating random tokens, etc.)
    Helper.generateRandomString = (length) => {
        return crypto_1.default.randomBytes(length).toString('hex'); // Generates a random string of the specified length
    };
    // 6. Generate Password Reset Token (with expiry)
    Helper.generatePasswordResetToken = () => {
        const token = Helper.generateRandomString(32); // Generate a random reset token
        const expirationDate = Date.now() + 3600000; // Set expiration time (1 hour)
        return { token, expirationDate };
    };
    // 7. Validate Email Format
    Helper.validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email); // Check if email matches regex
    };
    // 8. Handle Error (Custom Error Response Format)
    Helper.handleError = (message, statusCode) => {
        return { error: message, statusCode }; // Return error message and status code
    };
})(Helper || (exports.Helper = Helper = {}));
// 1. Generate JWT Token
