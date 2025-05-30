import path from 'path';
import { Helper } from '../utils/helper';
import { Types } from 'mongoose';
import Clinic from '../schema/Clinic';

class ClinicDAO {
    async getAllDiseases() {
        return await Clinic.find();
    }

    async getDiseaseByName(name: string) {
        return await Clinic.findOne({ name });
    }

    async addDisease(diseaseData: any) {
        const newDisease = new Clinic(diseaseData);
        return await newDisease.save();
    }

    async updateDisease(name: string, updateData: any) {
        return await Clinic.findOneAndUpdate({ name }, updateData, { new: true });
    }

    async deleteDisease(name: string) {
        return await Clinic.findOneAndDelete({ name });
    }
}
export default new ClinicDAO();