import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, LoginAction } from './types';

// The initial state of the LoginPage container
export const initialState: ContainerState = {
  loading: false,
  error: null,
  username: null,
};

const loginPageSlice = createSlice({
  name: 'loginPage',
  initialState,
  reducers: {
    tryLogin(state, _: PayloadAction<LoginAction>) {
      clearState(state);
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      clearState(state);
      state.username = action.payload;
    },
    loginFailed(state, action: PayloadAction<any>) {
      clearState(state);
      state.error = action.payload;
    },
  },
});

const clearState = (state: ContainerState) => {
  state.loading = false;
  state.error = null;
  state.username = null;
};

export const {
  actions: loginPageActions,
  reducer,
  name: sliceKey,
} = loginPageSlice;
