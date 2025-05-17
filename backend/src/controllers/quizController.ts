import { Request, Response } from 'express';
import Quiz from '../models/Quiz';

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Private
export const getQuizzes = async (req: Request, res: Response): Promise<void> => {
  try {
    const quizzes = await Quiz.find({}).sort({ dueDate: 1 });
    res.status(200).json(quizzes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Private
export const getQuizById = async (req: Request, res: Response): Promise<void> => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (quiz) {
      res.status(200).json(quiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private
export const createQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, course, topic, dueDate } = req.body;
    
    const quiz = await Quiz.create({
      title,
      course,
      topic,
      dueDate,
    });
    
    res.status(201).json(quiz);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a quiz
// @route   PUT /api/quizzes/:id
// @access  Private
export const updateQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, course, topic, dueDate } = req.body;
    
    const quiz = await Quiz.findById(req.params.id);
    
    if (quiz) {
      quiz.title = title || quiz.title;
      quiz.course = course || quiz.course;
      quiz.topic = topic || quiz.topic;
      quiz.dueDate = dueDate || quiz.dueDate;
      
      const updatedQuiz = await quiz.save();
      res.status(200).json(updatedQuiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a quiz
// @route   DELETE /api/quizzes/:id
// @access  Private
export const deleteQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (quiz) {
      await Quiz.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Quiz removed' });
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 