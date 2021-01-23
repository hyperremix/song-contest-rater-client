import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { competitionListPageActions } from './slice';
import { SelectCompetitionAction } from './types';

export function* getCompetitions() {
  try {
    const competitions = yield call(request, '/competitions');
    yield put(competitionListPageActions.competitionsLoaded(competitions));
  } catch (err) {
    yield put(competitionListPageActions.competitionsError(err));
  }
}

export function goToActs({
  payload: { history, id },
}: PayloadAction<SelectCompetitionAction>) {
  history.push(`/competitions/${id}`);
}

export function* competitionListPageSaga() {
  yield takeLatest(
    competitionListPageActions.loadCompetitions.type,
    getCompetitions,
  );
  yield takeEvery(competitionListPageActions.selectCompetition.type, goToActs);
}
