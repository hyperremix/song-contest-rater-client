import { Act, Rating, User } from '@hyperremix/song-contest-rater-model';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, SelectActAction } from './types';

// The initial state of the ActsPage container
export const initialState: ContainerState = {
  acts: [],
  ratings: [],
  users: [],
  loading: false,
  error: null,
  selectedAct: null,
  selectedRating: null,
  saveRatingLoading: false,
  saveRatingError: null,
};

const actsPageSlice = createSlice({
  name: 'actsPage',
  initialState,
  reducers: {
    loadActs(state) {
      state.loading = true;
    },
    actsLoaded(state, action: PayloadAction<Act[]>) {
      state.acts = action.payload;
      state.loading = false;
    },
    actsError(state, action: PayloadAction<Error>) {
      state.error = action.payload;
      state.loading = false;
    },
    loadRatings(state) {
      state.loading = true;
    },
    ratingsLoaded(state, action: PayloadAction<Rating[]>) {
      state.ratings = action.payload;
      state.loading = false;
    },
    usersLoaded(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    ratingsError(state, action: PayloadAction<Error>) {
      state.ratings = [];
      state.users = [];
      state.error = action.payload;
      state.loading = false;
    },
    selectAct(state, action: PayloadAction<SelectActAction>) {
      state.selectedAct =
        state.acts.find(act => act.id === action.payload.id) ?? null;
      state.selectedRating =
        state.ratings.find(
          rating =>
            rating.actId === action.payload.id &&
            rating.userId === action.payload.userId,
        ) ?? null;
    },
    unselectAct(state) {
      state.selectedAct = null;
      state.selectedRating = null;
    },
    trySaveRating(state, _: PayloadAction<Rating>) {
      state.saveRatingLoading = true;
    },
    saveRatingSuccess(state, action: PayloadAction<Rating>) {
      state.saveRatingLoading = false;
      const index = state.ratings.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.ratings = [
          ...state.ratings.slice(0, index),
          action.payload,
          ...state.ratings.slice(index + 1),
        ];
      } else {
        state.ratings = [...state.ratings, action.payload];
      }
      state.selectedAct = null;
      state.selectedRating = null;
    },
    saveRatingError(state, action: PayloadAction<Error>) {
      state.saveRatingLoading = false;
      state.saveRatingError = action.payload;
    },
  },
});

export const {
  actions: actsPageActions,
  reducer,
  name: sliceKey,
} = actsPageSlice;
