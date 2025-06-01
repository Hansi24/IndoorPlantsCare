// dao/post-dao.ts

import Post from '../schema/Post';  // Post schema import
import { Types } from 'mongoose';

// Create a new post
export const createPost = async (userId: Types.ObjectId, title:string, content: string, imageUrl?: string) => {
    try {
        const newPost = new Post({
            userId,
            title, 
            content,
            imageUrl,
            createdAt: new Date(),
        });
        await newPost.save();
        return newPost;
    } catch (error) {
        throw error;
    }
};

// Get all posts
export const getAllPosts = async () => {
    try {
        return await Post.find().populate('userId', 'name email').sort({ createdAt: -1 });
    } catch (error) {
        throw error;
    }
};
