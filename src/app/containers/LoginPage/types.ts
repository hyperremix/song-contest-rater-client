import { History } from 'history';

/* --- STATE --- */
export interface LoginPageState {
  loading: boolean;
  error: string | null;
}

export type ContainerState = LoginPageState;

export interface LoginAction {
  email: string;
  password: string;
  history: History<any>;
}
