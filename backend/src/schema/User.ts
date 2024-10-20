import mongoose, { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    address: string;
    email: string;
    gender: string;
    phoneNumber: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: false }, 
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
}, {
    timestamps: true, 
});

const User = model<IUser>('User', userSchema);

export default User;
