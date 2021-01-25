import { Act, Rating } from '@hyperremix/song-contest-rater-model';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the ActsPage container
export const initialState: ContainerState = {
  acts: [],
  ratings: [],
  loading: false,
  error: null,
};

const actsPageSlice = createSlice({
  name: 'actsPage',
  initialState,
  reducers: {
    actsLoaded(state, action: PayloadAction<Act[]>) {
      state.acts = action.payload;
      state.loading = false;
    },
    actsError(state, action: PayloadAction<Error>) {
      state.error = action.payload;
      state.loading = false;
    },
    ratingsLoaded(state, action: PayloadAction<Rating[]>) {
      state.ratings = action.payload;
      state.loading = false;
    },
    ratingsError(state, action: PayloadAction<Error>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  actions: actsPageActions,
  reducer,
  name: sliceKey,
} = actsPageSlice;
