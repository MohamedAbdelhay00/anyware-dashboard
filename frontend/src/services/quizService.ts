import api from './api';

export interface Quiz {
  _id: string;
  title: string;
  course: string;
  topic: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export const quizService = {
  getQuizzes: async (): Promise<Quiz[]> => {
    const response = await api.get('/quizzes');
    return response.data;
  },
  
  getQuizById: async (id: string): Promise<Quiz> => {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },
  
  createQuiz: async (quiz: Omit<Quiz, '_id' | 'createdAt' | 'updatedAt'>): Promise<Quiz> => {
    const response = await api.post('/quizzes', quiz);
    return response.data;
  },
  
  updateQuiz: async (
    id: string, 
    quiz: Partial<Omit<Quiz, '_id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Quiz> => {
    const response = await api.put(`/quizzes/${id}`, quiz);
    return response.data;
  },
  
  deleteQuiz: async (id: string): Promise<void> => {
    await api.delete(`/quizzes/${id}`);
  },
}; 