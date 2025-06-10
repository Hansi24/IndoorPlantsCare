import { Schema, model, Document, Types } from 'mongoose';

export interface IPlantView extends Document {
    _id: Types.ObjectId;
    plant: Types.ObjectId;
    view: number;
}

const plantViewSchema = new Schema<IPlantView>({
    plant: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
    view: { type: Number, default: 0 },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
});

export const PlantView = model<IPlantView>('PlantView', plantViewSchema);
