import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiError } from 'types';
import { request } from 'utils/request';
import { actsPageActions } from './slice';

export function* getActs() {
  try {
    const acts = yield call(request, `${process.env.REACT_APP_API_URL}/acts`);
    if (!acts?.length) {
      yield put(actsPageActions.actsError(ApiError.EMPTY_LIST));
      return;
    }

    yield put(actsPageActions.actsLoaded(acts));
  } catch (err) {
    yield put(actsPageActions.actsError(ApiError.RESPONSE_ERROR));
  }
}

export function* actsPageSaga() {
  yield takeLatest(actsPageActions.loadActs.type, getActs);
}
