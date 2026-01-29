import { Router } from 'express';
import {
    register,login
    
} from '../../controllers/admin/auth.controller.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
// router.post('/logout', verifyToken, logoutUser); // Protect logout to ensure user is logged in
// router.get('/me', verifyToken, getMe); // Protect this route to get current user info
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:token', resetPassword);

export default router;
