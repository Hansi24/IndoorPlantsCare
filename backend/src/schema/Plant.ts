import { Schema, model, Document, Types } from 'mongoose';

export interface IPlant extends Document {
    _id: Types.ObjectId;
    plantName: string;
    scientificName: string;
    family: string;
    origin: string;
    description: string;
    lightRequirements: string;
    wateringNeeds: string;
    humidityRequirements: string;
    soilType: string;
    fertilizer: string;
    temperatureRange: string;
    growthRate: string;
    matureSize: string;
    pruningTips: string;
    propagationMethods: string;
    toxicity: string;
    commonIssues: string;
    benefits: string;
    image: Types.ObjectId; 
}

const plantSchema = new Schema<IPlant>({
    plantName: { type: String, required: true },
    scientificName: { type: String, required: true },
    family: { type: String, required: true },
    origin: { type: String, required: true },
    description: { type: String, required: true },
    lightRequirements: { type: String, required: true },
    wateringNeeds: { type: String, required: true },
    humidityRequirements: { type: String, required: true },
    soilType: { type: String, required: true },
    fertilizer: { type: String, required: true },
    temperatureRange: { type: String, required: true },
    growthRate: { type: String, required: true },
    matureSize: { type: String, required: true },
    pruningTips: { type: String, required: true },
    propagationMethods: { type: String, required: true },
    toxicity: { type: String, required: true },
    commonIssues: { type: String, required: true },
    benefits: { type: String, required: true },
    image: { type: Schema.Types.ObjectId, ref: 'Image', required: true },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
});

export const Plant = model<IPlant>('Plant', plantSchema);
