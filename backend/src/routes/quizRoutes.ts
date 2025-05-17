import express from 'express';
import {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from '../controllers/quizController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getQuizzes)
  .post(protect, createQuiz);

router.route('/:id')
  .get(protect, getQuizById)
  .put(protect, updateQuiz)
  .delete(protect, deleteQuiz);

export default router; 