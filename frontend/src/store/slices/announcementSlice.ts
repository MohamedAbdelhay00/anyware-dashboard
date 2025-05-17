import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { announcementService } from '../../services/announcementService';
import type { Announcement } from '../../services/announcementService';

interface AnnouncementState {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementState = {
  announcements: [],
  loading: false,
  error: null,
};

export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAnnouncements',
  async (_, { rejectWithValue }) => {
    try {
      return await announcementService.getAnnouncements();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Failed to fetch announcements');
      }
      return rejectWithValue('Failed to fetch announcements');
    }
  }
);

export const createAnnouncement = createAsyncThunk(
  'announcements/createAnnouncement',
  async (announcementData: Omit<Announcement, '_id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      return await announcementService.createAnnouncement(announcementData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Failed to create announcement');
      }
      return rejectWithValue('Failed to create announcement');
    }
  }
);

export const updateAnnouncement = createAsyncThunk(
  'announcements/updateAnnouncement',
  async (
    { id, data }: { 
      id: string; 
      data: Partial<Omit<Announcement, '_id' | 'createdAt' | 'updatedAt'>>
    }, 
    { rejectWithValue }
  ) => {
    try {
      return await announcementService.updateAnnouncement(id, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Failed to update announcement');
      }
      return rejectWithValue('Failed to update announcement');
    }
  }
);

export const deleteAnnouncement = createAsyncThunk(
  'announcements/deleteAnnouncement',
  async (id: string, { rejectWithValue }) => {
    try {
      await announcementService.deleteAnnouncement(id);
      return id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Failed to delete announcement');
      }
      return rejectWithValue('Failed to delete announcement');
    }
  }
);

const announcementSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch announcements
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create announcement
      .addCase(createAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements.push(action.payload);
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update announcement
      .addCase(updateAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.announcements.findIndex(a => a._id === action.payload._id);
        if (index !== -1) {
          state.announcements[index] = action.payload;
        }
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete announcement
      .addCase(deleteAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = state.announcements.filter(a => a._id !== action.payload);
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default announcementSlice.reducer; 