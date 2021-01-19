import Auth from '@aws-amplify/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { request } from 'utils/request';
import { HttpMethod } from 'utils/types';
import getUuidByString from 'uuid-by-string';
import { selectUser } from './selectors';
import { sessionActions } from './slice';
import { UpdateUserAction } from './types';

export function* getUser(_: PayloadAction<void>) {
  try {
    const userInfo = yield call([Auth, 'currentAuthenticatedUser']);
    const userId = getUuidByString(userInfo.attributes.email);
    const user = yield call(request, `/users/${userId}`);
    yield put(sessionActions.getUserSuccess(user));
  } catch (err) {
    yield put(sessionActions.getUserFailed(err));
  }
}

export function* tryGetUser() {
  yield takeEvery(sessionActions.tryGetUser.type, getUser);
}

export function* updateUser({
  payload: { firstname, lastname },
}: PayloadAction<UpdateUserAction>) {
  try {
    let user = yield select(selectUser);
    user = {
      ...user,
      firstname,
      lastname,
    };
    const responseUser = yield call(request, `/users/${user.id}`, {
      method: HttpMethod.PUT,
      body: user,
    });
    yield put(sessionActions.updateUserSuccess(responseUser));
  } catch (err) {
    yield put(sessionActions.updateUserFailed(err));
  }
}

export function* tryUpdateUser() {
  yield takeEvery(sessionActions.tryUpdateUser.type, updateUser);
}
