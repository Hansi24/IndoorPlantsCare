import { Router } from 'express';
import { Util } from '../utils/util';
import { updateStatus } from '../endpoint/status-ep';
const router = Router();
router.patch('/update-status', Util.withErrorHandling(updateStatus));
export default router;
