import { User } from '@hyperremix/song-contest-rater-model';

export interface SessionState {
  user: User | null;
  isLoggedIn: boolean;
  getLoading: boolean;
  updateLoading: boolean;
  error: string | null;
  avatarLoading: boolean;
}

export interface UpdateUserAction {
  firstname: string;
  lastname: string;
}

export interface UpdateAvatarAction {
  file: File;
}
