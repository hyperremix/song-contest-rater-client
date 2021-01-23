/**
 *
 * ActsPage
 *
 */

import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { CompetitionItem } from 'app/components/competition/CompetitionItem';
import { SimpleSnackbar } from 'app/components/general/SimpleSnackbar/Loadable';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { getApiError } from '../../components/general/ApiErrorAlert';
import { selectSelectedCompetition } from '../CompetitionListPage/selectors';
import { ActItem } from './ActItem';
import { messages } from './messages';
import { actsPageSaga } from './saga';
import { selectActs, selectError, selectLoading } from './selectors';
import { reducer, sliceKey } from './slice';

export function ActsPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: actsPageSaga });
  const { t } = useTranslation();

  const selectedCompetition = useSelector(selectSelectedCompetition);
  const acts = useSelector(selectActs);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <>
      <Helmet>
        <title>{t(...messages.actsTitle)}</title>
        <meta name="description" content="Description of ActsPage" />
      </Helmet>
      <Grid container direction="column" justify="center" alignItems="stretch">
        <SimpleSnackbar
          severity="error"
          open={!!error}
          description={getApiError(t, error)}
        />
        {isLoading && <CircularProgress />}
        {!!selectedCompetition && (
          <CompetitionItem competition={selectedCompetition} />
        )}
        <Typography variant="h2">{t(...messages.actsTitle)}</Typography>
        {!!acts?.length && acts.map(act => <ActItem key={act.id} act={act} />)}
      </Grid>
    </>
  );
}
