import Auth from '@aws-amplify/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { request } from 'utils/request';
import getUuidByString from 'uuid-by-string';
import { sessionActions } from './slice';

export function* getUser(_: PayloadAction<void>) {
  try {
    const userInfo = yield call([Auth, 'currentAuthenticatedUser']);
    const userId = getUuidByString(userInfo.attributes.email);
    const user = yield call(
      request,
      `${process.env.REACT_APP_API_URL}/users/${userId}`,
    );
    yield put(sessionActions.getUserSuccess(user));
  } catch (err) {
    yield put(sessionActions.getUserFailed());
  }
}

export function* tryGetUser() {
  yield takeEvery(sessionActions.tryGetUser.type, getUser);
}
