import express from "express";
import ClinicEndpoint from "../endpoint/clinic-ep";

const router = express.Router();

router.get("/diseases", ClinicEndpoint.getAllDiseases);
router.get("/diseases/:name", ClinicEndpoint.getDiseaseByName);
router.post("/diseases", ClinicEndpoint.addDisease);
router.put("/diseases/:name", ClinicEndpoint.updateDisease);
router.delete("/diseases/:name", ClinicEndpoint.deleteDisease);


export default router;