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
exports.clearItemCartHandler = exports.clearCartHandler = exports.getCartHandler = exports.addToCartHandler = void 0;
const cart_dao_1 = require("../dao/cart-dao");
const util_1 = require("../utils/util"); // Utility helper for response handling
// Add Items to Cart
const addToCartHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        console.log(userId);
        if (!userId) {
            throw new Error('User not found');
        } // Cart ID (user's cart or session-based cart)
        const { items } = req.body; // Array of { foodId, qty }
        const cart = yield (0, cart_dao_1.addToCart)(userId, items);
        return util_1.Util.sendSuccess(res, cart, 'Items added to cart successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.addToCartHandler = addToCartHandler;
// Get Cart by userId
const getCartHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId; // Get userId from URL params
        const cart = yield (0, cart_dao_1.getCartByUserId)(userId);
        return util_1.Util.sendSuccess(res, cart, 'Cart retrieved successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.getCartHandler = getCartHandler;
// Clear Cart
const clearCartHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        yield (0, cart_dao_1.clearCart)(userId);
        return util_1.Util.sendSuccess(res, null, 'Cart cleared successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.clearCartHandler = clearCartHandler;
// Clear item inside Cart
const clearItemCartHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const foodId = req.body.foodId;
        yield (0, cart_dao_1.clearFoodItemInsideCard)(userId, foodId);
        return util_1.Util.sendSuccess(res, null, 'inside card item cleared successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.clearItemCartHandler = clearItemCartHandler;
