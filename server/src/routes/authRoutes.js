import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import {
  login,
  logout,
  signup,
  updateProfile,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.use(protectRoute);

router.get('/check', (req, res) => res.status(200).json(req.user));

router.put('/update-profile', updateProfile);

export default router;
