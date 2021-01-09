import { History } from 'history';

/* --- STATE --- */
export interface ForgotPasswordPageState {
  loading: boolean;
  error: string | null;
}

export type ContainerState = ForgotPasswordPageState;

export interface InitiateForgotPasswordAction {
  email: string;
  history: History<any>;
}
