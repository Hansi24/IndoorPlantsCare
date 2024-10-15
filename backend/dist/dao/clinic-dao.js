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
const clinic_1 = __importDefault(require("../schema/clinic"));
class ClinicDAO {
    getAllDiseases() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield clinic_1.default.find();
        });
    }
    getDiseaseByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield clinic_1.default.findOne({ name });
        });
    }
    addDisease(diseaseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDisease = new clinic_1.default(diseaseData);
            return yield newDisease.save();
        });
    }
    updateDisease(name, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield clinic_1.default.findOneAndUpdate({ name }, updateData, { new: true });
        });
    }
    deleteDisease(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield clinic_1.default.findOneAndDelete({ name });
        });
    }
}
exports.default = new ClinicDAO();
