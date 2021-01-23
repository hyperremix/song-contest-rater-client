import { Competition } from '@hyperremix/song-contest-rater-model';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { request } from 'utils/request';
import { selectSelectedCompetition } from '../CompetitionListPage/selectors';
import { competitionListPageActions } from '../CompetitionListPage/slice';
import { actsPageActions } from './slice';

export function* queryActs() {
  try {
    const selectedCompetition = (yield select(
      selectSelectedCompetition,
    )) as Competition;
    const queryParams = selectedCompetition.actIds
      .map(id => `ids=${id}`)
      .join('&');
    const acts = yield call(request, `/acts?${queryParams}`);
    yield put(actsPageActions.actsLoaded(acts));
  } catch (err) {
    yield put(actsPageActions.actsError(err));
  }
}

export function* actsPageSaga() {
  yield takeEvery(competitionListPageActions.selectCompetition.type, queryActs);
}
