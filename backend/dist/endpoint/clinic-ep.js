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
const clinic_dao_1 = __importDefault(require("../dao/clinic-dao"));
class ClinicEndpoint {
    getAllDiseases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const diseases = yield clinic_dao_1.default.getAllDiseases();
            res.json(diseases);
        });
    }
    getDiseaseByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const disease = yield clinic_dao_1.default.getDiseaseByName(req.params.name);
            res.json(disease);
        });
    }
    addDisease(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDisease = yield clinic_dao_1.default.addDisease(req.body);
            res.json(newDisease);
        });
    }
    updateDisease(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedDisease = yield clinic_dao_1.default.updateDisease(req.params.name, req.body);
            res.json(updatedDisease);
        });
    }
    deleteDisease(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield clinic_dao_1.default.deleteDisease(req.params.name);
            res.json({ message: "Disease deleted successfully" });
        });
    }
}
exports.default = new ClinicEndpoint();
