import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.actsPage || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  actsPageState => actsPageState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  actsPageState => actsPageState.error,
);

export const selectActs = createSelector(
  [selectDomain],
  actsPageState => actsPageState.acts,
);

export const selectRatings = createSelector(
  [selectDomain],
  actsPageState => actsPageState.ratings,
);

export const selectSelectedAct = createSelector(
  [selectDomain],
  actsPageState => actsPageState.selectedAct,
);

export const selectSelectedRating = createSelector(
  [selectDomain],
  actsPageState => actsPageState.selectedRating,
);

export const selectSaveRatingLoading = createSelector(
  [selectDomain],
  actsPageState => actsPageState.saveRatingLoading,
);

export const selectSaveRatingError = createSelector(
  [selectDomain],
  actsPageState => actsPageState.saveRatingError,
);
