import { Competition } from '@hyperremix/song-contest-rater-model';

/* --- STATE --- */
export interface CompetitionListPageState {
  loading: boolean;
  error?: Error | null;
  previousCompetitions: Competition[];
  upcomingCompetitions: Competition[];
  nextCompetition: Competition[];
  ongoingCompetition: Competition[];
}

export type ContainerState = CompetitionListPageState;
