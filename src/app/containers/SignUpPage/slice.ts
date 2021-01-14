import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, SignUpAction } from './types';

// The initial state of the SignUpPage container
export const initialState: ContainerState = {
  loading: false,
  error: null,
};

const signUpPageSlice = createSlice({
  name: 'signUpPage',
  initialState,
  reducers: {
    trySignUp(state, _: PayloadAction<SignUpAction>) {
      clearState(state);
      state.loading = true;
    },
    signUpSuccess(state, _: PayloadAction<void>) {
      clearState(state);
    },
    signUpFailed(state, action: PayloadAction<any>) {
      clearState(state);
      state.error = action.payload;
    },
  },
});

const clearState = (state: ContainerState) => {
  state.loading = false;
  state.error = null;
};

export const {
  actions: signUpPageActions,
  reducer,
  name: sliceKey,
} = signUpPageSlice;
