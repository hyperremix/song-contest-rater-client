import Auth from '@aws-amplify/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { emailConfirmationPageActions } from './slice';
import { EmailConfirmationAction as ConfirmEmailAction } from './types';

export function* confirmEmail({
  payload: { email, code, history },
}: PayloadAction<ConfirmEmailAction>) {
  try {
    yield call([Auth, 'confirmSignUp'], email, code);
    yield put(emailConfirmationPageActions.emailConfirmationSuccess());
    history.push('/signin?isInitialSignIn=true');
  } catch (err) {
    yield put(
      emailConfirmationPageActions.emailConfirmationFailed(err?.message),
    );
  }
}

export function* tryConfirmEmailSaga() {
  yield takeEvery(
    emailConfirmationPageActions.tryConfirmEmail.type,
    confirmEmail,
  );
}
