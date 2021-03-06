import { Act, Rating, User } from '@hyperremix/song-contest-rater-model';

/* --- STATE --- */
export interface ActsPageState {
  loading: boolean;
  error?: Error | null;
  acts: Act[];
  ratings: Rating[];
  users: User[];
  selectedAct?: Act | null;
  selectedRating: Rating | null;
  saveRatingLoading: boolean;
  saveRatingError?: Error | null;
}

export type ContainerState = ActsPageState;

export interface SelectActAction {
  id?: string;
  userId?: string;
}
