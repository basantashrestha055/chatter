import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import {
  getChatPartners,
  getContacts,
  getMessagesByUserId,
  sendMessage,
} from '../controllers/messageController.js';

const router = express.Router();

router.use(protectRoute);

router.get('/contacts', getContacts);
router.get('/chats', getChatPartners);
router.get('/:id', getMessagesByUserId);
router.post('/send/:id', sendMessage);

export default router;
