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
