import { Router } from 'express';
import { Util } from '../utils/util';
import { GardenEP } from '../endpoint/garden-ep';
import { Helper } from '../utils/helper';
import upload from '../utils/multerMiddleware';

const router = Router();

// Add plant with schedule to garden (with optional image upload)
router.post(
  '/add-plant-schedule',
  Helper.verifyToken,
  upload.single('plantImage'),
  Util.withErrorHandling(GardenEP.addPlantWithSchedule)
);

// Get user's garden
router.get(
  '/my-garden',
  Helper.verifyToken,
  Util.withErrorHandling(GardenEP.getGarden)
);

// Remove plant from garden
router.delete(
  '/remove-plant/:plantId',
  Helper.verifyToken,
  Util.withErrorHandling(GardenEP.removePlant)
);

// Get today's care tasks
router.get(
    '/todays-tasks',
    Helper.verifyToken,
    Util.withErrorHandling(GardenEP.getTodaysTasks)
  );

export default router;