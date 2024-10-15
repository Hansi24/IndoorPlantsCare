"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClinicSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    season: { type: String, required: true },
    type: { type: String, required: true },
    symptoms: { type: [String], required: true },
    treatments: { type: [String], required: true },
    caringMethods: { type: [String], required: true },
    fertilizers: { type: [{ name: String, amount: String }], required: true },
});
const Clinic = mongoose_1.default.model("Clinic", ClinicSchema);
exports.default = Clinic;
