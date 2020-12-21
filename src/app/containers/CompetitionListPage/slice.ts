import { Competition } from '@hyperremix/song-contest-rater-model';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiError } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the CompetitionListPage container
export const initialState: ContainerState = {
  loading: false,
  error: null,
  previousCompetitions: [],
  upcomingCompetitions: [],
  nextCompetition: [],
  ongoingCompetition: [],
};

const competitionListPageSlice = createSlice({
  name: 'competitionListPage',
  initialState,
  reducers: {
    loadCompetitions(state) {
      clearState(state);
      state.loading = true;
    },
    competitionsLoaded(state, action: PayloadAction<Competition[]>) {
      const now = new Date();
      const previousCompetitions = getPreviousCompetitions(action.payload, now);
      const upcomingCompetitions = getUpcomingCompetitions(action.payload, now);
      const nextCompetition = getNextCompetition(action.payload, now);
      const ongoingCompetition = getOngoingCompetition(action.payload, now);

      state.loading = false;
      state.previousCompetitions = previousCompetitions;
      state.upcomingCompetitions = upcomingCompetitions;
      state.nextCompetition = nextCompetition;
      state.ongoingCompetition = ongoingCompetition;
    },
    competitionsError(state, action: PayloadAction<ApiError>) {
      clearState(state);
      state.error = action.payload;
    },
  },
});

const clearState = (state: ContainerState) => {
  state.loading = false;
  state.error = null;
  state.previousCompetitions = [];
  state.upcomingCompetitions = [];
  state.nextCompetition = [];
  state.ongoingCompetition = [];
};

const getPreviousCompetitions = (competitions: Competition[], now: Date) =>
  competitions.filter(
    competition =>
      new Date(competition.startTime).getTime() < getDateSixHoursAgo(now),
  );

const getUpcomingCompetitions = (competitions: Competition[], now: Date) =>
  competitions.filter(
    competition =>
      new Date(competition.startTime).getTime() > getDateInOneDay(now),
  );

const getNextCompetition = (competitions: Competition[], now: Date) =>
  competitions
    .filter(
      competition =>
        new Date(competition.startTime).getTime() <= getDateInOneDay(now),
    )
    .filter(
      competition => new Date(competition.startTime).getTime() > now.getTime(),
    );

const getOngoingCompetition = (competitions: Competition[], now: Date) =>
  competitions
    .filter(
      competition => new Date(competition.startTime).getTime() <= now.getTime(),
    )
    .filter(
      competition =>
        new Date(competition.startTime).getTime() >= getDateSixHoursAgo(now),
    );

const getDateSixHoursAgo = (now: Date) => {
  const sixHoursAgo = new Date(now.getTime());
  sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);
  return sixHoursAgo.getTime();
};

const getDateInOneDay = (now: Date) => {
  const inOneDay = new Date(now.getTime());
  inOneDay.setDate(inOneDay.getDate() + 1);
  return inOneDay.getTime();
};

export const {
  actions: competitionListPageActions,
  reducer,
  name: sliceKey,
} = competitionListPageSlice;
