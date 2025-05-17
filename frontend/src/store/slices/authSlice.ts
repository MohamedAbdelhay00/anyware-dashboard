import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import type { User } from '../../services/authService';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Helper function to safely extract error message
function getErrorMessage(error: unknown, defaultMessage: string): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const apiError = error as ApiError;
    return apiError.response?.data?.message || defaultMessage;
  }
  return defaultMessage;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: authService.getCurrentUser(),
  isLoggedIn: authService.isLoggedIn(),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.login();
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, 'Login failed'));
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, 'Logout failed'));
    }
  }
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getProfile();
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, 'Failed to get profile'));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 