import { Competition } from '@hyperremix/song-contest-rater-model';
import { History } from 'history';

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

export interface SelectCompetitionAction {
  id: string | undefined;
  history: History<any>;
}
