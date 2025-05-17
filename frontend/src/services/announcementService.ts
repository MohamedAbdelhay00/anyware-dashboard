import api from './api';

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string;
    subject: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const announcementService = {
  getAnnouncements: async (): Promise<Announcement[]> => {
    const response = await api.get('/announcements');
    return response.data;
  },
  
  getAnnouncementById: async (id: string): Promise<Announcement> => {
    const response = await api.get(`/announcements/${id}`);
    return response.data;
  },
  
  createAnnouncement: async (announcement: Omit<Announcement, '_id' | 'createdAt' | 'updatedAt'>): Promise<Announcement> => {
    const response = await api.post('/announcements', announcement);
    return response.data;
  },
  
  updateAnnouncement: async (
    id: string, 
    announcement: Partial<Omit<Announcement, '_id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Announcement> => {
    const response = await api.put(`/announcements/${id}`, announcement);
    return response.data;
  },
  
  deleteAnnouncement: async (id: string): Promise<void> => {
    await api.delete(`/announcements/${id}`);
  },
}; 