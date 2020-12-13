import { Act } from '@hyperremix/song-contest-rater-model';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiError } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the ActsPage container
export const initialState: ContainerState = {
  acts: [],
  loading: false,
  error: null,
};

const actsPageSlice = createSlice({
  name: 'actsPage',
  initialState,
  reducers: {
    loadActs(state) {
      state.loading = true;
      state.error = null;
      state.acts = [];
    },
    actsLoaded(state, action: PayloadAction<Act[]>) {
      state.acts = action.payload;
      state.loading = false;
    },
    actsError(state, action: PayloadAction<ApiError>) {
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
