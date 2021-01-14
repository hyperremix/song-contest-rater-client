import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.loginPage || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  state => state.loading,
);

export const selectError = createSelector([selectDomain], state => state.error);
