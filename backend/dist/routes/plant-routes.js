"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const util_1 = require("../utils/util");
const plant_ep_1 = require("../endpoint/plant-ep");
const multerMiddleware_1 = __importDefault(require("../utils/multerMiddleware"));
const router = (0, express_1.Router)();
// Route to add a new plant item (with image upload)
router.post('/add-plant', multerMiddleware_1.default.single('image'), util_1.Util.withErrorHandling(plant_ep_1.addPlantItem));
// Route to get all plant items
router.get('/all-plants', util_1.Util.withErrorHandling(plant_ep_1.getAllPlantItems));
// Route to search for plants
router.post('/search-plants', util_1.Util.withErrorHandling(plant_ep_1.searchPlant));
// Route to get plants by category (family)
router.get('/cat-plants', util_1.Util.withErrorHandling(plant_ep_1.catPlant));
// Route to get popular plant items based on views
router.get('/popular-plants', util_1.Util.withErrorHandling(plant_ep_1.popularPlant));
exports.default = router;
