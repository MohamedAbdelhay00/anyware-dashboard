import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { quizService } from '../../services/quizService';
import type { Quiz } from '../../services/quizService';

interface QuizState {
  quizzes: Quiz[];
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quizzes: [],
  loading: false,
  error: null,
};

export const fetchQuizzes = createAsyncThunk(
  'quizzes/fetchQuizzes',
  async (_, { rejectWithValue }) => {
    try {
      return await quizService.getQuizzes();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Failed to fetch quizzes');
      }
      return rejectWithValue('Failed to fetch quizzes');
    }
  }
);

export const createQuiz = createAsyncThunk(
  'quizzes/createQuiz',
  async (quizData: Omit<Quiz, '_id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      return await quizService.createQuiz(quizData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Failed to create quiz');
      }
      return rejectWithValue('Failed to create quiz');
    }
  }
);

export const updateQuiz = createAsyncThunk(
  'quizzes/updateQuiz',
  async (
    { id, data }: { 
      id: string; 
      data: Partial<Omit<Quiz, '_id' | 'createdAt' | 'updatedAt'>>
    }, 
    { rejectWithValue }
  ) => {
    try {
      return await quizService.updateQuiz(id, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Failed to update quiz');
      }
      return rejectWithValue('Failed to update quiz');
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  'quizzes/deleteQuiz',
  async (id: string, { rejectWithValue }) => {
    try {
      await quizService.deleteQuiz(id);
      return id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Failed to delete quiz');
      }
      return rejectWithValue('Failed to delete quiz');
    }
  }
);

const quizSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch quizzes
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create quiz
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes.push(action.payload);
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update quiz
      .addCase(updateQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.quizzes.findIndex(q => q._id === action.payload._id);
        if (index !== -1) {
          state.quizzes[index] = action.payload;
        }
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete quiz
      .addCase(deleteQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = state.quizzes.filter(q => q._id !== action.payload);
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default quizSlice.reducer; 