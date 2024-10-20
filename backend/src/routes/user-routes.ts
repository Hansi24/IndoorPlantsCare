import { Router } from 'express';
import { registerUser, loginUser, userDetail, fetchAllUsers } from '../endpoint/user-ep';
import { Util } from '../utils/util';
import { Helper } from '../utils/helper';

const router = Router();

router.post('/register', Util.withErrorHandling(registerUser));
router.post('/login', Util.withErrorHandling(loginUser));
router.get('/user-details', Helper.verifyToken, Util.withErrorHandling(userDetail));
router.get('/users', Helper.verifyToken, Util.withErrorHandling(fetchAllUsers));

export default router;
