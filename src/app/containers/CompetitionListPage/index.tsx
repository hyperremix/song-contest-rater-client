/**
 *
 * CompetitionListPage
 *
 */

import { CircularProgress, Grid } from '@material-ui/core';
import { SimpleSnackbar } from 'app/components/general/SimpleSnackbar/Loadable';
import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { CompetitionList } from '../../components/competition/CompetitionList/Loadable';
import { getApiError } from '../../components/general/ApiErrorAlert';
import { messages } from './messages';
import { competitionListPageSaga } from './saga';
import {
  selectError,
  selectLoading,
  selectNextCompetition,
  selectOngoingCompetition,
  selectPreviousCompetitions,
  selectUpcomingCompetitions,
} from './selectors';
import { competitionListPageActions, reducer, sliceKey } from './slice';

export function CompetitionListPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: competitionListPageSaga });
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const previousCompetitions = useSelector(selectPreviousCompetitions);
  const upcomingCompetitions = useSelector(selectUpcomingCompetitions);
  const nextCompetition = useSelector(selectNextCompetition);
  const ongoingCompetition = useSelector(selectOngoingCompetition);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(competitionListPageActions.loadCompetitions());
  });

  return (
    <>
      <Helmet>
        <title>{t(...messages.competitionsTitle)}</title>
        <meta name="description" content={t(...messages.competitionsTitle)} />
      </Helmet>
      <Grid container spacing={2}>
        <SimpleSnackbar
          severity="error"
          open={!!error}
          description={getApiError(t, error)}
        />
        <Grid item xs={12}>
          {isLoading && <CircularProgress />}
          <CompetitionListWrapper
            header={t(...messages.ongoingCompetitionHeader)}
            competitions={ongoingCompetition}
          />
          <CompetitionListWrapper
            header={t(...messages.nextCompetitionHeader)}
            competitions={nextCompetition}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CompetitionListWrapper
            header={t(...messages.upcomingCompetitionHeader)}
            competitions={upcomingCompetitions}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CompetitionListWrapper
            header={t(...messages.previousCompetitionHeader)}
            competitions={previousCompetitions}
          />
        </Grid>
      </Grid>
    </>
  );
}

const CompetitionListWrapper = ({ header, competitions }) => (
  <>
    {!!competitions.length && (
      <CompetitionList header={header} competitions={competitions} />
    )}
  </>
);
