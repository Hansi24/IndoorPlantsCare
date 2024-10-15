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
exports.clearFoodItemInsideCard = exports.clearCart = exports.getCartByUserId = exports.addToCart = void 0;
const mongoose_1 = require("mongoose");
const Cart_1 = __importDefault(require("../schema/Cart"));
// Add Items to Cart (POST)
const addToCart = (userId, items) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cart = yield Cart_1.default.findOne({ userId });
        if (!cart) {
            const convertedItems = items.map((item) => ({
                foodId: new mongoose_1.Types.ObjectId(item.foodId),
                qty: item.qty
            }));
            cart = new Cart_1.default({ userId, items: convertedItems });
        }
        else {
            items.forEach((item) => {
                const foodItemId = new mongoose_1.Types.ObjectId(item.foodId);
                const existingItem = cart === null || cart === void 0 ? void 0 : cart.items.find((i) => i.foodId.toString() === foodItemId.toString());
                if (existingItem) {
                    existingItem.qty += item.qty;
                }
                else {
                    cart === null || cart === void 0 ? void 0 : cart.items.push({ foodId: foodItemId, qty: item.qty });
                }
            });
        }
        yield cart.save();
        return cart;
    }
    catch (error) {
        throw error;
    }
});
exports.addToCart = addToCart;
// Get Cart by Cart ID (GET)
const getCartByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield Cart_1.default.findOne({ userId }).populate({
            path: 'items.foodId',
            populate: {
                path: 'image',
                model: 'Image' // The name of the Image model
            }
        }); // Populate food details
        return cart;
    }
    catch (error) {
        throw error;
    }
});
exports.getCartByUserId = getCartByUserId;
// Clear Cart (DELETE)
const clearCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield Cart_1.default.findOneAndDelete({ userId });
        return cart;
    }
    catch (error) {
        throw error;
    }
});
exports.clearCart = clearCart;
// Clear item inside Cart (DELETE)
const clearFoodItemInsideCard = (userId, foodId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foodObjectId = new mongoose_1.Types.ObjectId(foodId);
        const cart = yield Cart_1.default.findOneAndUpdate({ userId }, { $pull: { items: { foodId: foodObjectId } } }, { new: true });
        if (!cart) {
            throw new Error("Cart not found");
        }
        return cart;
    }
    catch (error) {
        throw error;
    }
});
exports.clearFoodItemInsideCard = clearFoodItemInsideCard;
