import { Router } from 'express';
import { Util } from '../utils/util';
import { getSchedule, treatmentEp } from '../endpoint/schedule-ep';

const router = Router();

// Route to add a new plant item (with image upload)
router.post('/care', Util.withErrorHandling(getSchedule));
router.get("/treatment/plant/:name", Util.withErrorHandling(treatmentEp));

export default router;
