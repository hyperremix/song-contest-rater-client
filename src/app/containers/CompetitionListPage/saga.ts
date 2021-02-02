import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { competitionListPageActions } from './slice';

export function* getCompetitions() {
  try {
    const competitions = yield call(request, '/competitions');
    yield put(competitionListPageActions.competitionsLoaded(competitions));
  } catch (err) {
    yield put(competitionListPageActions.competitionsError(err));
  }
}

export function* competitionListPageSaga() {
  yield takeLatest(
    competitionListPageActions.loadCompetitions.type,
    getCompetitions,
  );
}
