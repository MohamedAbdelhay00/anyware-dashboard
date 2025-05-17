import api from './api';

export interface User {
  _id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  token?: string;
}

export const authService = {
  login: async (): Promise<User> => {
    const response = await api.post('/users/login');
    const data = response.data;
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    
    return data;
  },
  
  logout: async (): Promise<void> => {
    await api.post('/users/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getProfile: async (): Promise<User> => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('token');
  },
  
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
}; 