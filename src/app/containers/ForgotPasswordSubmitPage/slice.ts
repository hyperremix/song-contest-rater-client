import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, ForgotPasswordSubmitAction } from './types';

// The initial state of the ForgotPasswordSubmitPage container
export const initialState: ContainerState = {
  loading: false,
  error: null,
};

const forgotPasswordSubmitPageSlice = createSlice({
  name: 'forgotPasswordSubmitPage',
  initialState,
  reducers: {
    tryForgotPasswordSubmit(
      state,
      _: PayloadAction<ForgotPasswordSubmitAction>,
    ) {
      clearState(state);
      state.loading = true;
    },
    forgotPasswordSubmitSuccess(state, _: PayloadAction<void>) {
      clearState(state);
    },
    forgotPasswordSubmitFailed(state, action: PayloadAction<any>) {
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
  actions: forgotPasswordSubmitPageActions,
  reducer,
  name: sliceKey,
} = forgotPasswordSubmitPageSlice;
