import { User } from '@hyperremix/song-contest-rater-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionState } from './types';

export const initialState: SessionState = {
  user: null,
  isLoggedIn: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    tryGetUser(state, _: PayloadAction<void>) {
      clearState(state);
    },
    getUserSuccess(state, action: PayloadAction<User>) {
      clearState(state);
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    getUserFailed(state, _: PayloadAction<void>) {
      clearState(state);
    },
  },
});

const clearState = (state: SessionState) => {
  state.user = null;
  state.isLoggedIn = false;
};

export const {
  actions: sessionActions,
  reducer,
  name: sliceKey,
} = sessionSlice;
