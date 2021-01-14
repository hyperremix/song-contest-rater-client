import Auth from '@aws-amplify/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { sessionActions } from 'session/slice';
import { loginPageActions } from './slice';
import { LoginAction } from './types';

export function* login({
  payload: { email, password, history },
}: PayloadAction<LoginAction>) {
  try {
    yield call([Auth, 'signIn'], email, password);
    yield put(loginPageActions.loginSuccess());
    yield put(sessionActions.tryGetUser());
    history.push('/');
  } catch (err) {
    yield put(loginPageActions.loginFailed(err?.message));
  }
}

export function* tryLoginSaga() {
  yield takeEvery(loginPageActions.tryLogin.type, login);
}
