import { History } from 'history';

/* --- STATE --- */
export interface SignUpPageState {
  loading: boolean;
  error: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
}

export type ContainerState = SignUpPageState;

export interface SignUpAction {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  history: History<any>;
}
