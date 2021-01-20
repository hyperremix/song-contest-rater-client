import { User } from '@hyperremix/song-contest-rater-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionState, UpdateUserAction } from './types';

export const initialState: SessionState = {
  user: null,
  isLoggedIn: false,
  error: null,
  getLoading: false,
  updateLoading: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    tryGetUser(state, _: PayloadAction<void>) {
      clearState(state);
      state.getLoading = true;
    },
    getUserSuccess(state, action: PayloadAction<User>) {
      clearState(state);
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    getUserFailed(state, action: PayloadAction<string>) {
      clearState(state);
      state.error = action.payload;
    },
    tryUpdateUser(state, _: PayloadAction<UpdateUserAction>) {
      state.updateLoading = true;
    },
    updateUserSuccess(state, action: PayloadAction<User>) {
      state.updateLoading = false;
      state.error = null;
      state.user = action.payload;
    },
    updateUserFailed(state, action: PayloadAction<string>) {
      state.updateLoading = false;
      state.error = action.payload;
    },
  },
});

const clearState = (state: SessionState) => {
  state.getLoading = false;
  state.error = null;
};

export const {
  actions: sessionActions,
  reducer,
  name: sliceKey,
} = sessionSlice;
