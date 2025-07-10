import { Types } from 'mongoose';
import Garden, { IPlant, IGarden, IScheduleItem } from '../schema/Garden';

export class GardenDAO {
  static async getGardenByUserId(userId: Types.ObjectId): Promise<IGarden | null> {
    return await Garden.findOne({ userId });
  }

  static async addPlantToGarden(
    userId: Types.ObjectId,
    plant: IPlant
  ): Promise<IGarden> {
    return await Garden.findOneAndUpdate(
      { userId },
      { $push: { plants: plant } },
      { new: true, upsert: true }
    );
  }

  static async updatePlantSchedule(
    userId: string,
    plantId: string,
    schedule: any[]
  ): Promise<IGarden | null> {
    return await Garden.findOneAndUpdate(
      { userId, 'plants.plantId': plantId },
      { $set: { 'plants.$.schedule': schedule } },
      { new: true }
    );
  }

  static async removePlantFromGarden(
    userId: Types.ObjectId,
    plantId: string
  ): Promise<IGarden | null> {
    return await Garden.findOneAndUpdate(
      { userId },
      { $pull: { plants: { plantId } } },
      { new: true }
    );
  }

  static async getTodaysCareTasks(userId: Types.ObjectId): Promise<{
    plantId: string;
    plantName: string;
    imageUrl?: string;
    tasks: IScheduleItem[];
  }[]> {
    const garden = await Garden.findOne({ userId });
    if (!garden) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

    return garden.plants.flatMap(plant => {
      const todaysTasks = plant.schedule?.filter(task => {
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
      }) || [];

      if (todaysTasks.length === 0) return [];

      return [{
        plantId: plant.plantId,
        plantName: plant.plantName,
        imageUrl: plant.imageUrl,
        tasks: todaysTasks
      }];
    });
  }
}