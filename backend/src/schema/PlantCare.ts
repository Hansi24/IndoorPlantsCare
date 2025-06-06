import { Schema, model, Document, Types } from 'mongoose';

export interface IWatering {
    amount: string;
    schedule: string;
}

export interface IFertilization {
    type?: string;
    amount?: string;
    schedule?: string;
}

export interface ICareSchedule {
    date: Date;
    watering?: IWatering;
    fertilization?: IFertilization;
    pruningMaintenance?: string;
    conditionCheck?: string;
}

export interface IPlantCare extends Document {
    plantId: Types.ObjectId; // Reference to Plant
    age: string;
    userId: Types.ObjectId; // Reference to User
    schedule: ICareSchedule[]; // Change from string[] to ICareSchedule[]
}

const plantCareSchema = new Schema<IPlantCare>({
    plantId: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
    age: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    schedule: [
        {
          date: { type: String, required: true },
          watering: {
            amount: { type: String, required: true },
            schedule: { type: String, required: true },
          },
          fertilization: {
            type: { type: String, required: false }, 
            amount: { type: String, required: false },
          },
          pruning_maintenance: { type: String, required: true },
          condition_check: { type: String, required: true },
        },
    ],
}, {
    timestamps: true, // Adds createdAt and updatedAt
});


export const PlantCare = model<IPlantCare>('PlantCare', plantCareSchema);

