import { Schema, model, Document } from 'mongoose';

interface IImage extends Document {
    filename: string;  // The filename of the image
    url: string;  // The URL of the image (could be relative or full path)
}

const imageSchema = new Schema<IImage>({
    filename: { type: String, required: true },
    url: { type: String, required: true },
}, {
    timestamps: true,  // Automatically track image upload times
});

export const Image = model<IImage>('Image', imageSchema);
