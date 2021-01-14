import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, EmailConfirmationAction } from './types';

// The initial state of the EmailConfirmationPage container
export const initialState: ContainerState = {
  loading: false,
  error: null,
};

const emailConfirmationPageSlice = createSlice({
  name: 'emailConfirmationPage',
  initialState,
  reducers: {
    tryConfirmEmail(state, _: PayloadAction<EmailConfirmationAction>) {
      clearState(state);
      state.loading = true;
    },
    emailConfirmationSuccess(state, _: PayloadAction<void>) {
      clearState(state);
    },
    emailConfirmationFailed(state, action: PayloadAction<any>) {
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
  actions: emailConfirmationPageActions,
  reducer,
  name: sliceKey,
} = emailConfirmationPageSlice;
