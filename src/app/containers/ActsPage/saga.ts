import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actsPageActions } from './slice';

export function* getActs() {
  try {
    const acts = yield call(request, `${process.env.REACT_APP_API_URL}/acts`);
    yield put(actsPageActions.actsLoaded(acts));
  } catch (err) {
    yield put(actsPageActions.actsError(err));
  }
}

export function* actsPageSaga() {
  yield takeLatest(actsPageActions.loadActs.type, getActs);
}
