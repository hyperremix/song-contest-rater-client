import Auth from '@aws-amplify/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { forgotPasswordSubmitPageActions } from './slice';
import { ForgotPasswordSubmitAction } from './types';

export function* forgotPasswordSubmit({
  payload: { email, code, password, history },
}: PayloadAction<ForgotPasswordSubmitAction>) {
  try {
    yield call([Auth, 'forgotPasswordSubmit'], email, code, password);
    yield put(forgotPasswordSubmitPageActions.forgotPasswordSubmitSuccess());
    history.push(`/signin?isPasswordReset=true`);
  } catch (err) {
    yield put(
      forgotPasswordSubmitPageActions.forgotPasswordSubmitFailed(err?.message),
    );
  }
}

export function* tryForgotPasswordSubmit() {
  yield takeEvery(
    forgotPasswordSubmitPageActions.tryForgotPasswordSubmit.type,
    forgotPasswordSubmit,
  );
}
