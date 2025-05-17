import { render, screen } from '@testing-library/react';
import QuizCard from './QuizCard';
import type { Quiz } from '../../services/quizService';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: { [key: string]: string } = {
          'dashboard.startQuiz': 'Start Quiz',
          'dashboard.solveAssignment': 'Solve Assignment'
        };
        return translations[key] || key;
      }
    };
  }
}));

describe('QuizCard', () => {
  // Mock data
  const mockQuizData: Quiz = {
    _id: '1',
    title: 'Quiz 1: Introduction to React',
    course: 'Web Development',
    topic: 'React Fundamentals',
    dueDate: '2023-12-31T14:00:00.000Z',
    createdAt: '2023-11-01T14:00:00.000Z',
    updatedAt: '2023-11-01T14:00:00.000Z'
  };

  const mockAssignmentData: Quiz = {
    _id: '2',
    title: 'Assignment 1: React Components',
    course: 'Web Development',
    topic: 'React Components',
    dueDate: '2023-12-31T14:00:00.000Z',
    createdAt: '2023-11-01T14:00:00.000Z',
    updatedAt: '2023-11-01T14:00:00.000Z'
  };

  it('renders quiz information correctly', () => {
    render(<QuizCard quiz={mockQuizData} />);
    
    // Check if title is displayed
    expect(screen.getByText('Quiz 1: Introduction to React')).toBeInTheDocument();
    
    // Check if course is displayed
    expect(screen.getByText('Course: Web Development')).toBeInTheDocument();
    
    // Check if topic is displayed
    expect(screen.getByText('Topic: React Fundamentals')).toBeInTheDocument();
    
    // Check if dueDate is displayed (partial match as the formatting is complex)
    expect(screen.getByText(/Due To:/)).toBeInTheDocument();
    
    // Check if correct button text is displayed for quiz
    expect(screen.getByText('Start Quiz')).toBeInTheDocument();
  });

  it('shows different button text for assignments', () => {
    render(<QuizCard quiz={mockAssignmentData} />);
    
    // Check assignment-specific button text
    expect(screen.getByText('Solve Assignment')).toBeInTheDocument();
  });
}); 