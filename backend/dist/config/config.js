"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Get environment variables, and assign default values if missing
const config = {
    JWT_SECRET: process.env.JWT_SECRET || '11', // Provide default in case variable is missing
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    DB_URI: process.env.DB_URI || 'mongodb://127.0.0.1:27017/IndoorPlantCareApp',
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000, // Default port is 5000
};
exports.config = config;
