import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiError } from 'types';
import { request } from 'utils/request';
import { competitionListPageActions } from './slice';

export function* getCompetitions() {
  try {
    const competitions = yield call(
      request,
      `${process.env.REACT_APP_API_URL}/competitions`,
    );
    if (!competitions?.length) {
      yield put(
        competitionListPageActions.competitionsError(ApiError.EMPTY_LIST),
      );
      return;
    }

    yield put(competitionListPageActions.competitionsLoaded(competitions));
  } catch (err) {
    yield put(
      competitionListPageActions.competitionsError(ApiError.RESPONSE_ERROR),
    );
  }
}

export function* competitionListPageSaga() {
  yield takeLatest(
    competitionListPageActions.loadCompetitions.type,
    getCompetitions,
  );
}
