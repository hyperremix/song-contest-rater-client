import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) =>
  state.competitionListPage || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  state => state.loading,
);

export const selectError = createSelector([selectDomain], state => state.error);

export const selectPreviousCompetitions = createSelector(
  [selectDomain],
  state => state.previousCompetitions,
);

export const selectUpcomingCompetitions = createSelector(
  [selectDomain],
  state => state.upcomingCompetitions,
);

export const selectNextCompetition = createSelector(
  [selectDomain],
  state => state.nextCompetition,
);

export const selectOngoingCompetition = createSelector(
  [selectDomain],
  state => state.ongoingCompetition,
);
