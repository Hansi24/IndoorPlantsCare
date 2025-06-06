import { Request, Response, NextFunction } from 'express';
import { Util } from '../utils/util'; // Utility helper for response handling
import { getScheduleByAgeAndPlantName, getTreatmentDao } from '../dao/schedule-dao';


export const getSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.userId;
        console.log(userId);
        if(!userId){
            throw new Error('User not found');
        } 
        const { age, plantName, plantId } = req.body; 

        const schedule = await getScheduleByAgeAndPlantName(userId, plantId, age, plantName);
        return Util.sendSuccess(res, schedule, 'fetch the schedule successfully');
    } catch (error) {
        next(error);
    }
};

export const treatmentEp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.params.name;
        if(!name){
            throw new Error('disease Name not found');
        } 
        const treatment = await getTreatmentDao(name);
        return Util.sendSuccess(res, treatment, 'fetch the treatment successfully');
    } catch (error) {
        next(error);
    }
};