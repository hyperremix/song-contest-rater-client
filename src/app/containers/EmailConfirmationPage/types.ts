import { History } from 'history';

/* --- STATE --- */
export interface EmailConfirmationPageState {
  loading: boolean;
  error: string | null;
}

export type ContainerState = EmailConfirmationPageState;

export interface EmailConfirmationAction {
  email: string;
  code: string;
  history: History<any>;
}
