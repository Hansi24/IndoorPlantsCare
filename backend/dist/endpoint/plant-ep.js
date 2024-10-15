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
exports.popularPlant = exports.catPlant = exports.searchPlant = exports.getAllPlantItems = exports.addPlantItem = void 0;
const plant_dao_1 = require("../dao/plant-dao");
const util_1 = require("../utils/util");
// Add new plant item
const addPlantItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { plantName, scientificName, family, origin, description, lightRequirements, wateringNeeds, humidityRequirements, soilType, fertilizer, temperatureRange, growthRate, matureSize, pruningTips, propagationMethods, toxicity, commonIssues, benefits } = req.body;
    const imageFile = req.file;
    try {
        if (!imageFile) {
            throw new Error('Image file is required');
        }
        const plantItem = yield (0, plant_dao_1.addPlant)({
            plantName, scientificName, family, origin, description,
            lightRequirements, wateringNeeds, humidityRequirements,
            soilType, fertilizer, temperatureRange, growthRate,
            matureSize, pruningTips, propagationMethods, toxicity,
            commonIssues, benefits
        }, imageFile);
        return util_1.Util.sendSuccess(res, plantItem, 'Plant item added successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.addPlantItem = addPlantItem;
// Get all plant items
const getAllPlantItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plantItems = yield (0, plant_dao_1.getAllPlants)();
        return util_1.Util.sendSuccess(res, plantItems, 'All plant items retrieved successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPlantItems = getAllPlantItems;
// Search plants by keyword
const searchPlant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyword = req.query.keyword;
        const searchedPlants = yield (0, plant_dao_1.searchedPlantItems)(keyword);
        util_1.Util.sendSuccess(res, searchedPlants, 'Plant items searched successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.searchPlant = searchPlant;
// Filter plants by category (family)
const catPlant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.query.category;
        if (!category) {
            throw new Error('Category is required');
        }
        const catPlants = yield (0, plant_dao_1.categoryPlantItems)(category);
        util_1.Util.sendSuccess(res, catPlants, 'Plant items listed by category');
    }
    catch (error) {
        next(error);
    }
});
exports.catPlant = catPlant;
// Get popular plant items (based on views)
const popularPlant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const popularPlants = yield (0, plant_dao_1.popularPlantItems)();
        util_1.Util.sendSuccess(res, popularPlants, 'Popular plant items retrieved successfully');
    }
    catch (error) {
        next(error);
    }
});
exports.popularPlant = popularPlant;
