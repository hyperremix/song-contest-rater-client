import { Act } from '@hyperremix/song-contest-rater-model';

/* --- STATE --- */
export interface ActsPageState {
  loading: boolean;
  error?: Error | null;
  acts: Act[];
}

export type ContainerState = ActsPageState;
