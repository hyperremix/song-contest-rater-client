/**
 *
 * CompetitionListPage
 *
 */

import {
  Box,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { CompetitionList } from '../../components/competition/CompetitionList/Loadable';
import { ApiErrorAlert } from '../../components/general/ApiErrorAlert';
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
  const theme = useTheme();

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

  const isAtLeastSmallMedia = useMediaQuery(theme.breakpoints.up('sm'));
  const isExtraSmallMedia = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Helmet>
        <title>{t(...messages.competitionsTitle)}</title>
        <meta name="description" content={t(...messages.competitionsTitle)} />
      </Helmet>
      <Box>
        {isLoading && <CircularProgress />}
        {error && <ApiErrorAlert error={error} />}
        <CompetitionListWrapper
          header={t(...messages.ongoingCompetitionHeader)}
          competitions={ongoingCompetition}
        />
        <CompetitionListWrapper
          header={t(...messages.nextCompetitionHeader)}
          competitions={nextCompetition}
        />
      </Box>
      {isAtLeastSmallMedia && (
        <Grid container spacing={1}>
          <CompetitionListWrapper
            header={t(...messages.previousCompetitionHeader)}
            competitions={previousCompetitions}
          />
          <CompetitionListWrapper
            header={t(...messages.upcomingCompetitionHeader)}
            competitions={upcomingCompetitions}
          />
        </Grid>
      )}
      {isExtraSmallMedia && (
        <Box>
          <CompetitionListWrapper
            header={t(...messages.upcomingCompetitionHeader)}
            competitions={upcomingCompetitions}
          />
          <CompetitionListWrapper
            header={t(...messages.previousCompetitionHeader)}
            competitions={previousCompetitions}
          />
        </Box>
      )}
    </>
  );
}

const CompetitionListWrapper = ({ header, competitions }) => (
  <>
    {!!competitions.length && (
      <Grid item xs>
        <CompetitionList header={header} competitions={competitions} />
      </Grid>
    )}
  </>
);
