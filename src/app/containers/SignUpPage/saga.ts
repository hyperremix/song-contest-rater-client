import Auth from '@aws-amplify/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { signUpPageActions } from './slice';
import { SignUpAction } from './types';

export function* signUp({
  payload: { firstname, lastname, email, password, history },
}: PayloadAction<SignUpAction>) {
  try {
    yield call([Auth, 'signUp'], email, password);
    yield put(
      signUpPageActions.signUpSuccess({
        firstname,
        lastname,
        email,
      }),
    );
    history.push('/');
  } catch (err) {
    yield put(signUpPageActions.signUpFailed(err?.message));
  }
}

export function* trySignUpSaga() {
  yield takeEvery(signUpPageActions.trySignUp.type, signUp);
}
