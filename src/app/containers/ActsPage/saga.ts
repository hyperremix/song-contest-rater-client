import { Act, Competition, Rating } from '@hyperremix/song-contest-rater-model';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { request } from 'utils/request';
import { HttpMethod } from 'utils/types';
import { selectSelectedCompetition } from '../CompetitionListPage/selectors';
import { competitionListPageActions } from '../CompetitionListPage/slice';
import { actsPageActions } from './slice';

export function* queryActs() {
  try {
    yield put(actsPageActions.loadActs());

    const selectedCompetition = (yield select(
      selectSelectedCompetition,
    )) as Competition;

    if (!selectedCompetition?.actIds) {
      yield put(actsPageActions.actsLoaded([]));
      return;
    }

    const queryParams = selectedCompetition.actIds
      .map(id => `ids=${id}`)
      .join('&');
    const scrambledActs = (yield call(
      request,
      `/acts?${queryParams}`,
    )) as Act[];
    const acts = [...selectedCompetition.actIds].map(
      id => scrambledActs.find(act => act.id === id)!,
    );
    yield put(actsPageActions.actsLoaded(acts));
  } catch (err) {
    yield put(actsPageActions.actsError(err));
  }
}

export function* queryRatings() {
  try {
    yield put(actsPageActions.loadRatings());

    const selectedCompetition = (yield select(
      selectSelectedCompetition,
    )) as Competition;

    if (!selectedCompetition?.ratingIds) {
      yield put(actsPageActions.actsLoaded([]));
      return;
    }

    const ratingsQueryParams = selectedCompetition.ratingIds
      .map(id => `ids=${id}`)
      .join('&');
    const ratings = (yield call(
      request,
      `/ratings?${ratingsQueryParams}`,
    )) as Rating[];
    const usersQueryParams = ratings
      .map(rating => `ids=${rating.userId}`)
      .join('&');
    const users = yield call(request, `/users?${usersQueryParams}`);
    yield put(actsPageActions.ratingsLoaded(ratings));
    yield put(actsPageActions.usersLoaded(users));
  } catch (err) {
    yield put(actsPageActions.ratingsError(err));
  }
}

export function* saveRating({ payload }: PayloadAction<Rating>) {
  try {
    let rating: Rating;

    if (!payload.id) {
      rating = yield call(request, `/ratings`, {
        method: HttpMethod.POST,
        body: payload,
      });
    } else {
      rating = yield call(request, `/ratings/${payload.id}`, {
        method: HttpMethod.PUT,
        body: payload,
      });
    }

    yield put(actsPageActions.saveRatingSuccess(rating));
  } catch (err) {
    yield put(actsPageActions.saveRatingError(err));
  }
}

export function* actsPageSaga() {
  yield takeEvery(competitionListPageActions.selectCompetition.type, queryActs);
  yield takeEvery(
    competitionListPageActions.selectCompetition.type,
    queryRatings,
  );
  yield takeEvery(actsPageActions.trySaveRating.type, saveRating);
}
