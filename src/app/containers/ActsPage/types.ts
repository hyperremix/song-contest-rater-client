import { Act, Rating } from '@hyperremix/song-contest-rater-model';

/* --- STATE --- */
export interface ActsPageState {
  loading: boolean;
  error?: Error | null;
  acts: Act[];
  ratings: Rating[];
}

export type ContainerState = ActsPageState;
