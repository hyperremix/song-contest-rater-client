import { Competition } from '@hyperremix/song-contest-rater-model';

/* --- STATE --- */
export interface CompetitionListPageState {
  loading: boolean;
  error?: Error | null;
  previousCompetitions: Competition[];
  upcomingCompetitions: Competition[];
  nextCompetition: Competition[];
  ongoingCompetition: Competition[];
  allCompetitions: Competition[];
  selectedCompetition: Competition | null;
}

export type ContainerState = CompetitionListPageState;
