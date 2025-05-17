import { render, screen } from '@testing-library/react';
import AnnouncementCard from './AnnouncementCard';
import type { Announcement } from '../../services/announcementService';

describe('AnnouncementCard', () => {
  const mockAnnouncement: Announcement = {
    _id: '1',
    title: 'Test Announcement',
    content: 'This is a test announcement',
    author: {
      name: 'John Doe',
      subject: 'Computer Science',
      avatar: 'https://example.com/avatar.jpg'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  it('renders announcement content correctly', () => {
    render(<AnnouncementCard announcement={mockAnnouncement} />);
    
    // Check if author name is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check if subject is displayed
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    
    // Check if content is displayed
    expect(screen.getByText('This is a test announcement')).toBeInTheDocument();
    
    // Check if avatar is present
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar.tagName).toBe('IMG');
  });
}); 