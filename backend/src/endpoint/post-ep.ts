// endpoint/post-ep.ts

import { NextFunction, Request, Response } from 'express';
import { createPost, getAllPosts } from '../dao/post-dao';
import { Util } from '../utils/util';
import { title } from 'process';

// Create new post
export const createPostHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { content } = req.body;
    const userId = req.user.userId;
    const imageUrl = req.file ? req.file.path : undefined;  // Handle image URL

    try {
        const post = await createPost(userId, title, content, imageUrl);
        return Util.sendSuccess(res, post, "Post created successfully");
    } catch (error) {
        next(error);
    }
};

// Get all posts
export const getAllPostsHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const posts = await getAllPosts();
        return Util.sendSuccess(res, posts, "Posts retrieved successfully");
    } catch (error) {
        next(error);
    }
};
