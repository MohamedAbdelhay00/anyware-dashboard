import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../store/slices/authSlice';
import { requireAuth } from './RequireAuth';

const TestComponent = () => <div>Protected Content</div>;
const ProtectedComponent = requireAuth(TestComponent);

const HomeComponent = () => <div>Home Page</div>;

describe('RequireAuth', () => {
  const createMockStore = (isLoggedIn: boolean) => {
    return configureStore({
      reducer: {
        auth: authReducer
      },
      preloadedState: {
        auth: {
          user: isLoggedIn ? { _id: '1', name: 'Test User', email: 'test@example.com', isLoggedIn: true } : null,
          isLoggedIn,
          loading: false,
          error: null
        }
      }
    });
  };

  it('allows access to protected route when user is logged in', () => {
    const store = createMockStore(true);
    
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/protected" element={<ProtectedComponent />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Home Page')).not.toBeInTheDocument();
  });

  it('redirects to home page when user is not logged in', () => {
    const store = createMockStore(false);
    
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/protected" element={<ProtectedComponent />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
}); 