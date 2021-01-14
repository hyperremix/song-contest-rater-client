import { User } from '@hyperremix/song-contest-rater-model';

export interface SessionState {
  user: User | null;
  isLoggedIn: boolean;
}
