import Auth, { CognitoUser } from '@aws-amplify/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loginPageActions } from './slice';
import { LoginAction } from './types';

export function* login({
  payload: { username, password, history },
}: PayloadAction<LoginAction>) {
  try {
    const user: CognitoUser = yield call([Auth, 'signIn'], username, password);
    yield put(loginPageActions.loginSuccess(user.getUsername()));
    history.push('/');
  } catch (err) {
    yield put(loginPageActions.loginFailed(err?.message));
  }
}

export function* tryLoginSaga() {
  yield takeEvery(loginPageActions.tryLogin.type, login);
}
