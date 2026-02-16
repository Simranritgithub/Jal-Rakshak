import { Router } from 'express';
import {
    register,login,authme
    
} from '../../controllers/admin/auth.controller.js';
import { allowRoles, verifyToken } from '../../middlewares/auth.middleware.js';
import { createashaprofile } from '../../controllers/Ashaworker/Profile.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
 router.post('/asha/profile', verifyToken,allowRoles("Asha worker"), createashaprofile);
 router.get('/me', verifyToken, authme);
// router.get('/me', verifyToken, getMe); // Protect this route to get current user info
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:token', resetPassword);

export default router;
