import express from 'express';
import {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcementController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getAnnouncements)
  .post(protect, createAnnouncement);

router.route('/:id')
  .get(protect, getAnnouncementById)
  .put(protect, updateAnnouncement)
  .delete(protect, deleteAnnouncement);

export default router; 