// schema/Post.ts

import mongoose, { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: Date;
}

const postSchema = new Schema<IPost>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },  // Optional field for image URL
    createdAt: { type: Date, default: Date.now },
});

const Post = model<IPost>('Post', postSchema);

export default Post;
