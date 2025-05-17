import express from 'express';
import { loginUser, logoutUser, getUserProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);
router.get('/profile', protect, getUserProfile);

export default router; 