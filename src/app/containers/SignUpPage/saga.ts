import Auth from '@aws-amplify/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { request } from 'utils/request';
import { HttpMethod } from 'utils/types';
import { signUpPageActions } from './slice';
import { SignUpAction } from './types';

export function* signUp({
  payload: { firstname, lastname, email, password, history },
}: PayloadAction<SignUpAction>) {
  try {
    yield call([Auth, 'signUp'], email, password);
    yield call(request, `${process.env.REACT_APP_API_URL}/users`, {
      method: HttpMethod.POST,
      body: { firstname, lastname, email },
    });
    yield put(
      signUpPageActions.signUpSuccess({
        firstname,
        lastname,
        email,
      }),
    );
    history.push(`/emailconfirmation?email=${email}`);
  } catch (err) {
    yield put(signUpPageActions.signUpFailed(err?.message));
  }
}

export function* trySignUpSaga() {
  yield takeEvery(signUpPageActions.trySignUp.type, signUp);
}
