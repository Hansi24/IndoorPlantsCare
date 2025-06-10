import { Router } from 'express';
import { Util } from '../utils/util';
import { addPlantItem, catPlant, getAllPlantItems, searchPlant, popularPlant, viewdPlant } from '../endpoint/plant-ep';
import { Helper } from '../utils/helper';
import upload from '../utils/multerMiddleware';

const router = Router();

// Route to add a new plant item (with image upload)
router.post('/add-plant', upload.single('image'), Util.withErrorHandling(addPlantItem));

// Route to get all plant items
router.get('/all-plants', Util.withErrorHandling(getAllPlantItems));

// Route to search for plants
router.post('/search-plants', Util.withErrorHandling(searchPlant));

// Route to get plants by category (family)
router.get('/cat-plants', Util.withErrorHandling(catPlant));

// Route to get popular plant items based on views
router.get('/popular-plants', Util.withErrorHandling(popularPlant));

router.post('/view-plant', Util.withErrorHandling(viewdPlant));

export default router;
