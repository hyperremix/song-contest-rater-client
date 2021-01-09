import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, InitiateForgotPasswordAction } from './types';

// The initial state of the ForgotPasswordPage container
export const initialState: ContainerState = {
  loading: false,
  error: null,
};

const forgotPasswordPageSlice = createSlice({
  name: 'forgotPasswordPage',
  initialState,
  reducers: {
    initiateForgotPassword(
      state,
      _: PayloadAction<InitiateForgotPasswordAction>,
    ) {
      clearState(state);
      state.loading = true;
    },
    initiateForgotPasswordSuccess(state, _: PayloadAction<void>) {
      clearState(state);
    },
    initiateForgotPasswordFailed(state, action: PayloadAction<any>) {
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
  actions: forgotPasswordPageActions,
  reducer,
  name: sliceKey,
} = forgotPasswordPageSlice;
