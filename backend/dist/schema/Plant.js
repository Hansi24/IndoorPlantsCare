"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plant = void 0;
const mongoose_1 = require("mongoose");
const plantSchema = new mongoose_1.Schema({
    plantName: { type: String, required: true },
    scientificName: { type: String, required: true },
    family: { type: String, required: true },
    origin: { type: String, required: true },
    description: { type: String, required: true },
    lightRequirements: { type: String, required: true },
    wateringNeeds: { type: String, required: true },
    humidityRequirements: { type: String, required: true },
    soilType: { type: String, required: true },
    fertilizer: { type: String, required: true },
    temperatureRange: { type: String, required: true },
    growthRate: { type: String, required: true },
    matureSize: { type: String, required: true },
    pruningTips: { type: String, required: true },
    propagationMethods: { type: String, required: true },
    toxicity: { type: String, required: true },
    commonIssues: { type: String, required: true },
    benefits: { type: String, required: true },
    image: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Image', required: true },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
});
exports.Plant = (0, mongoose_1.model)('Plant', plantSchema);
