import Auth from '@aws-amplify/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { request } from 'utils/request';
import { HttpMethod } from 'utils/types';
import getUuidByString from 'uuid-by-string';
import { selectUser } from './selectors';
import { sessionActions } from './slice';
import { UpdateAvatarAction } from './types';

export function* getUser() {
  try {
    const userInfo = yield call([Auth, 'currentAuthenticatedUser']);
    const userId = getUuidByString(userInfo.attributes.email);
    const user = yield call(request, `/users/${userId}`);
    yield put(sessionActions.getUserSuccess(user));
  } catch (err) {
    yield put(sessionActions.getUserFailed(err));
  }
}

export function* updateUser() {
  try {
    const user = yield select(selectUser);
    const responseUser = yield call(request, `/users/${user.id}`, {
      method: HttpMethod.PUT,
      body: user,
    });
    yield put(sessionActions.updateUserSuccess(responseUser));
  } catch (err) {
    yield put(sessionActions.updateUserFailed(err));
  }
}

export function* updateAvatar({
  payload: { file },
}: PayloadAction<UpdateAvatarAction>) {
  try {
    const user = yield select(selectUser);
    const { signedUrl } = yield call(request, `/users/${user.id}/avatar`, {
      method: HttpMethod.POST,
      body: { contentType: file.type },
    });
    yield call(fetch, signedUrl, {
      method: HttpMethod.PUT,
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    yield put(sessionActions.updateAvatarSuccess(URL.createObjectURL(file)));
  } catch (err) {
    yield put(sessionActions.updateAvatarFailed(err));
  }
}

export function* sessionSaga() {
  yield takeEvery(sessionActions.tryGetUser.type, getUser);
  yield takeEvery(sessionActions.tryUpdateUser.type, updateUser);
  yield takeEvery(sessionActions.tryUpdateAvatar.type, updateAvatar);
}
