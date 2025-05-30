import { Request, Response } from "express";
import ClinicDAO from "../dao/clinic-dao";

class ClinicEndpoint {
    async getAllDiseases(req: Request, res: Response) {
        const diseases = await ClinicDAO.getAllDiseases();
        res.json(diseases);
    }

    async getDiseaseByName(req: Request, res: Response) {
        const disease = await ClinicDAO.getDiseaseByName(req.params.name);
        res.json(disease);
    }

    async addDisease(req: Request, res: Response) {
        const newDisease = await ClinicDAO.addDisease(req.body);
        res.json(newDisease);
    }

    async updateDisease(req: Request, res: Response) {
        const updatedDisease = await ClinicDAO.updateDisease(req.params.name, req.body);
        res.json(updatedDisease);
    }

    async deleteDisease(req: Request, res: Response) {
        await ClinicDAO.deleteDisease(req.params.name);
        res.json({ message: "Disease deleted successfully" });
    }
    
}

export default new ClinicEndpoint();