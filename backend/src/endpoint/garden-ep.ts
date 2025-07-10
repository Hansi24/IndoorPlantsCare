import { Request, Response } from 'express';
import { GardenDAO } from '../dao/garden-dao';
import { IPlant } from '../schema/Garden';

export class GardenEP {
  static async addPlantWithSchedule(req: Request, res: Response) {
    try {
      const userId = req.user.userId;
      const { plant, schedule } = req.body;

      if (!plant || !schedule) {
        return res.status(400).json({ success: false, message: 'Plant and schedule are required' });
      }

      const plantWithSchedule: IPlant = {
        plantId: plant.id || new Date().getTime().toString(),
        plantName: plant.plantName,
        imageUrl: plant.imageUrl,
        age: plant.age,
        addedDate: new Date(),
        schedule: schedule.map((item: any) => ({
          date: new Date(item.date),
          watering: item.watering,
          fertilization: item.fertilization,
          pruningMaintenance: item.pruningMaintenance,
          conditionCheck: item.conditionCheck
        }))
      };

      const garden = await GardenDAO.addPlantToGarden(userId, plantWithSchedule);

      res.status(201).json({
        success: true,
        message: 'Plant added to garden with schedule',
        data: garden
      });
    } catch (error) {
      console.error('Error adding plant to garden:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  static async getGarden(req: Request, res: Response) {
    try {
      const userId = req.user.userId;
      const garden = await GardenDAO.getGardenByUserId(userId);

      if (!garden) {
        return res.status(200).json({ success: true, data: { plants: [] } });
      }

      res.status(200).json({ success: true, data: garden });
    } catch (error) {
      console.error('Error fetching garden:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  static async removePlant(req: Request, res: Response) {
    try {
      const userId = req.user.userId;
      const { plantId } = req.params;

      const garden = await GardenDAO.removePlantFromGarden(userId, plantId);

      if (!garden) {
        return res.status(404).json({ success: false, message: 'Plant not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Plant removed from garden',
        data: garden
      });
    } catch (error) {
      console.error('Error removing plant from garden:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  static async getTodaysTasks(req: Request, res: Response) {
    try {
      const userId = req.user.userId;
      const todaysTasks = await GardenDAO.getTodaysCareTasks(userId);

      res.status(200).json({
        success: true,
        message: "Today's care tasks retrieved successfully",
        data: todaysTasks
      });
    } catch (error) {
      console.error('Error fetching today\'s tasks:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}