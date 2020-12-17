import { Competition } from '@hyperremix/song-contest-rater-model';
import { ApiError } from 'types';

/* --- STATE --- */
export interface CompetitionListPageState {
  loading: boolean;
  error?: ApiError | null;
  previousCompetitions: Competition[];
  upcomingCompetitions: Competition[];
  nextCompetition: Competition[];
  ongoingCompetition: Competition[];
}

export type ContainerState = CompetitionListPageState;
