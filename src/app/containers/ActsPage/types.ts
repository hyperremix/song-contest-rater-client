import { Act } from '@hyperremix/song-contest-rater-model';
import { ApiError } from 'types';

/* --- STATE --- */
export interface ActsPageState {
  loading: boolean;
  error?: ApiError | null;
  acts: Act[];
}

export type ContainerState = ActsPageState;
