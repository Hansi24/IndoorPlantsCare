"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_ep_1 = require("../endpoint/cart-ep");
const router = (0, express_1.Router)();
// Add items to the cart
router.post('/add', cart_ep_1.addToCartHandler);
// Get Cart by userId
router.get('/items', cart_ep_1.getCartHandler);
// Clear Cart
router.delete('/clear', cart_ep_1.clearCartHandler);
router.delete('/clear/item', cart_ep_1.clearItemCartHandler);
exports.default = router;
