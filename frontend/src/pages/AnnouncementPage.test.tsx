import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import AnnouncementPage from './AnnouncementPage';
import authReducer from '../store/slices/authSlice';
import announcementReducer from '../store/slices/announcementSlice';

jest.mock('../components/layout/Layout', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>
  };
});

// Mock the AnnouncementsList component to avoid testing its implementation
jest.mock('../components/dashboard/AnnouncementsList', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="announcements-list">Mocked Announcements List</div>
  };
});

describe('AnnouncementPage', () => {
  const renderAnnouncementPage = () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
        announcements: announcementReducer
      },
      preloadedState: {
        auth: {
          user: { _id: '1', name: 'Test User', email: 'test@example.com', isLoggedIn: true },
          isLoggedIn: true,
          loading: false,
          error: null
        },
        announcements: {
          announcements: [],
          loading: false,
          error: null
        }
      }
    });

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <AnnouncementPage />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders correctly with title and announcements list', () => {
    renderAnnouncementPage();
    
    // Check if the page title is rendered
    expect(screen.getByText('Announcements')).toBeInTheDocument();
    
    // Check if the layout is rendered
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    
    // Check if the announcements list is rendered
    expect(screen.getByTestId('announcements-list')).toBeInTheDocument();
  });

  it('has the correct styling for the title', () => {
    renderAnnouncementPage();
    
    // Check if the title has the correct heading level
    const title = screen.getByText('Announcements');
    expect(title.tagName).toBe('H4');
  });
}); 