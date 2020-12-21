import { History } from 'history';

/* --- STATE --- */
export interface LoginPageState {
  loading: boolean;
  error: string | null;
  username: string | null;
}

export type ContainerState = LoginPageState;

export interface LoginAction {
  username: string;
  password: string;
  history: History<any>;
}
