"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clinic_ep_1 = __importDefault(require("../endpoint/clinic-ep"));
const router = express_1.default.Router();
router.get("/diseases", clinic_ep_1.default.getAllDiseases);
router.get("/diseases/:name", clinic_ep_1.default.getDiseaseByName);
router.post("/diseases", clinic_ep_1.default.addDisease);
router.put("/diseases/:name", clinic_ep_1.default.updateDisease);
router.delete("/diseases/:name", clinic_ep_1.default.deleteDisease);
exports.default = router;
