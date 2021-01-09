import { History } from 'history';

/* --- STATE --- */
export interface ForgotPasswordSubmitPageState {
  loading: boolean;
  error: string | null;
}

export type ContainerState = ForgotPasswordSubmitPageState;

export interface ForgotPasswordSubmitAction {
  email: string;
  password: string;
  code: string;
  history: History<any>;
}
