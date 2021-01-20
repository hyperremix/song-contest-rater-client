import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.session || initialState;

export const selectIsLoggedIn = createSelector(
  [selectDomain],
  session => session.isLoggedIn,
);

export const selectUser = createSelector(
  [selectDomain],
  session => session.user,
);

export const selectGetLoading = createSelector(
  [selectDomain],
  state => state.getLoading,
);

export const selectUpdateLoading = createSelector(
  [selectDomain],
  state => state.updateLoading,
);

export const selectAvatarLoading = createSelector(
  [selectDomain],
  state => state.avatarLoading,
);

export const selectError = createSelector([selectDomain], state => state.error);
