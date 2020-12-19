/**
 *
 * ActsPage
 *
 */

import { CircularProgress, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { ApiErrorAlert } from '../../components/general/ApiErrorAlert';
import { ActItem } from './ActItem';
import { messages } from './messages';
import { actsPageSaga } from './saga';
import { selectActs, selectError, selectLoading } from './selectors';
import { actsPageActions, reducer, sliceKey } from './slice';

export function ActsPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: actsPageSaga });
  const { t } = useTranslation();

  const acts = useSelector(selectActs);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actsPageActions.loadActs());
  });

  return (
    <>
      <Helmet>
        <title>{t(...messages.actsTitle)}</title>
        <meta name="description" content="Description of ActsPage" />
      </Helmet>
      <Typography variant="h2">{t(...messages.actsTitle)}</Typography>
      <Grid container direction="column" justify="center" alignItems="stretch">
        {isLoading && <CircularProgress />}
        {acts?.length ? (
          acts.map(act => <ActItem key={act.id} act={act} />)
        ) : error ? (
          <ApiErrorAlert error={error} />
        ) : null}
      </Grid>
    </>
  );
}
