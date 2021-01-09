import Auth from '@aws-amplify/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { forgotPasswordPageActions } from './slice';
import { InitiateForgotPasswordAction } from './types';

export function* forgotPassword({
  payload: { email, history },
}: PayloadAction<InitiateForgotPasswordAction>) {
  try {
    yield call([Auth, 'forgotPassword'], email);
    yield put(forgotPasswordPageActions.initiateForgotPasswordSuccess());
    history.push(`/forgotpasswordsubmit?email=${email}`);
  } catch (err) {
    yield put(
      forgotPasswordPageActions.initiateForgotPasswordFailed(err?.message),
    );
  }
}

export function* tryInitiateForgotPassword() {
  yield takeEvery(
    forgotPasswordPageActions.initiateForgotPassword.type,
    forgotPassword,
  );
}
