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
exports.popularPlantItems = exports.categoryPlantItems = exports.searchedPlantItems = exports.getAllPlants = exports.addPlant = void 0;
const Plant_1 = require("../schema/Plant");
const Image_1 = require("../schema/Image");
const path_1 = __importDefault(require("path"));
// Add plant to database
const addPlant = (plantData, imageFile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = new Image_1.Image({
            filename: imageFile.filename,
            url: path_1.default.join('uploads', imageFile.filename),
        });
        const savedImage = yield image.save();
        const newPlant = new Plant_1.Plant(Object.assign(Object.assign({}, plantData), { image: savedImage._id }));
        yield newPlant.save();
        return newPlant;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.addPlant = addPlant;
// Get all plants from the database
const getAllPlants = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plantData = yield Plant_1.Plant.find().populate('image');
        return plantData;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.getAllPlants = getAllPlants;
// Search plants by keyword
const searchedPlantItems = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!keyword) {
            const allPlants = yield Plant_1.Plant.find().populate('image');
            return allPlants;
        }
        const regex = new RegExp(keyword, 'i');
        const plants = yield Plant_1.Plant.find({
            $or: [
                { plantName: regex },
                { scientificName: regex },
                { family: regex },
                { origin: regex },
                { description: regex },
            ],
        }).populate('image');
        return plants;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.searchedPlantItems = searchedPlantItems;
// Get plants by category (family)
const categoryPlantItems = (family) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!family) {
            throw new Error('Invalid family category');
        }
        const plantsByFamily = yield Plant_1.Plant.find({ family }).populate('image');
        return plantsByFamily;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.categoryPlantItems = categoryPlantItems;
// Get popular plants based on views
const popularPlantItems = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const popularPlants = yield Plant_1.Plant.aggregate([
            { $unwind: "$views" }, // Assuming "views" tracks plant popularity
            { $group: { _id: "$plantName", viewCount: { $sum: 1 } } },
            { $sort: { viewCount: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "images", // The name of the Image collection
                    localField: "image",
                    foreignField: "_id",
                    as: "imageDetails",
                },
            },
            { $unwind: "$imageDetails" },
            {
                $project: {
                    _id: 0,
                    plantName: "$_id",
                    viewCount: 1,
                    image: {
                        url: "$imageDetails.url",
                    },
                },
            },
        ]);
        return popularPlants;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.popularPlantItems = popularPlantItems;
