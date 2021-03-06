import { User } from '@hyperremix/song-contest-rater-model';

export interface SessionState {
  user: User | null;
  isLoggedIn: boolean;
  getLoading: boolean;
  updateLoading: boolean;
  error: Error | null;
  avatarLoading: boolean;
}

export interface UpdateAvatarAction {
  file: File;
}
