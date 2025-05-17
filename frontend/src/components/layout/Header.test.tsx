import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { Provider } from 'react-redux';
import type { Store } from '@reduxjs/toolkit';

// Define the app state type for better type safety
type AppState = {
  auth: {
    user: { _id: string; name: string; email: string; isLoggedIn: boolean };
    isLoggedIn: boolean;
    loading: boolean;
    error: null;
  };
};

const createMockStore = () => {
  return {
    getState: () => ({
      auth: {
        user: { _id: '1', name: 'Test User', email: 'test@example.com', isLoggedIn: true },
        isLoggedIn: true,
        loading: false,
        error: null
      }
    }),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    replaceReducer: jest.fn(),
    [Symbol.observable]: jest.fn()
  } as Store;
};

// Mock the redux hooks
jest.mock('../../hooks/reduxHooks', () => ({
  useAppSelector: (selector: (state: AppState) => unknown) => selector({
    auth: {
      user: { _id: '1', name: 'Test User', email: 'test@example.com', isLoggedIn: true },
      isLoggedIn: true,
      loading: false,
      error: null
    }
  }),
  useAppDispatch: () => jest.fn()
}));

// Mock the logout action
jest.mock('../../store/slices/authSlice', () => ({
  logout: jest.fn()
}));

describe('Header', () => {
  const mockMenuClick = jest.fn();

  const renderHeader = (isMobile = false) => {
    const store = createMockStore();

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Header isMobile={isMobile} onMenuClick={mockMenuClick} />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders desktop header correctly when user is logged in', () => {
    renderHeader(false);
    
    // Welcome message should include the user's name
    expect(screen.getAllByText(/Welcome Test User/i)[0]).toBeInTheDocument();
    
    // Logout button should be visible
    const logoutButtons = screen.getAllByText('app.logout');
    expect(logoutButtons.length).toBeGreaterThan(0);
    
    // Search input should be present
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
  });

  it('renders mobile header correctly', () => {
    renderHeader(true);
    
    // Menu button should be visible
    const menuButton = screen.getByLabelText('open drawer');
    expect(menuButton).toBeInTheDocument();
    
    // Should show the welcome message
    const welcomeTexts = screen.getAllByText(/Welcome Test User/i);
    expect(welcomeTexts.length).toBeGreaterThan(0);
    
    // Avatar should be visible
    expect(screen.getByAltText('Test User')).toBeInTheDocument();
  });

  it('calls onMenuClick when menu button is clicked on mobile', () => {
    renderHeader(true);
    
    // Find and click the menu button
    const menuButton = screen.getByLabelText('open drawer');
    fireEvent.click(menuButton);
    
    // Verify the function was called
    expect(mockMenuClick).toHaveBeenCalledTimes(1);
  });

  it('shows avatar menu when avatar is clicked on mobile', () => {
    renderHeader(true);
    
    // Find and click the avatar
    const avatar = screen.getByAltText('Test User');
    fireEvent.click(avatar);
    
    const logoutItems = screen.getAllByText('app.logout');
    expect(logoutItems.length).toBeGreaterThan(0);
  });
}); 