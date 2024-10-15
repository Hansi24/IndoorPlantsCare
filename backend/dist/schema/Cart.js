"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Cart Item Schema
const cartItemSchema = new mongoose_1.Schema({
    foodId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Food', required: true },
    qty: { type: Number, required: true, min: 1 },
});
// Cart Schema
const cartSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema], // Array of cart items
}, {
    timestamps: true, // Automatically add createdAt and updatedAt
});
const Cart = (0, mongoose_1.model)('Cart', cartSchema);
exports.default = Cart;
