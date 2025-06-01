import { Router } from 'express';
import { createPostHandler, getAllPostsHandler } from '../endpoint/post-ep';
import { Helper } from '../utils/helper';
import multer from 'multer';

// Set up image upload with multer
const upload = multer({ dest: 'uploads/' });  // Store uploaded images in the 'uploads' directory

const router = Router();

// Route for creating a post (with image upload)
router.post('/create', Helper.verifyToken, upload.single('image'), createPostHandler);

// Route for getting all posts
router.get('/all', Helper.verifyToken, getAllPostsHandler);

export default router;
