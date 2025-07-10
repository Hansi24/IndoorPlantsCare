import mongoose, { Schema, Document } from 'mongoose';

export interface IPlantSchedule {
  date: Date;
  watering?: {
    amount: string;
    schedule: string;
  };
  fertilization?: {
    type: string;
    amount: string;
    days?: number; 
  };
}

// Export IScheduleItem as an alias for IPlantSchedule
export type IScheduleItem = IPlantSchedule;

export interface IPlant {
  plantId: string;
  plantName: string;
  imageUrl?: string;
  age: string;
  addedDate: Date;
  schedule: IPlantSchedule[];
}

export interface IGarden extends Document {
  userId: string;
  plants: IPlant[];
  createdAt: Date;
  updatedAt: Date;
}

const PlantScheduleSchema: Schema = new Schema({
  date: { type: Date, required: true },
  watering: {
    amount: { type: String },
    schedule: { type: String }
  },
  fertilization: {
    type: { type: String },
    amount: { type: String },
    days: { type: Number } // Added days field
  },
  pruningMaintenance: { type: String },
  conditionCheck: { type: String }
});

const PlantSchema: Schema = new Schema({
  plantId: { type: String, required: true },
  plantName: { type: String, required: true },
  imageUrl: { type: String },
  age: { type: String, required: true },
  addedDate: { type: Date, default: Date.now },
  schedule: [PlantScheduleSchema]
});

const GardenSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  plants: [PlantSchema]
}, {
  timestamps: true
});

export default mongoose.model<IGarden>('Garden', GardenSchema);