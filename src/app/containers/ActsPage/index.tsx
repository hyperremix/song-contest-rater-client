/**
 *
 * ActsPage
 *
 */

import {
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Replay } from '@material-ui/icons';
import { CompetitionItem } from 'app/components/competition/CompetitionItem';
import { SimpleSnackbar } from 'app/components/general/SimpleSnackbar/Loadable';
import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { getApiError } from '../../components/general/ApiErrorAlert';
import { selectSelectedCompetition } from '../CompetitionListPage/selectors';
import { competitionListPageActions } from '../CompetitionListPage/slice';
import { ActItem } from './ActItem';
import { messages } from './messages';
import { actsPageSaga } from './saga';
import {
  selectActs,
  selectError,
  selectLoading,
  selectRatings,
  selectUsers,
} from './selectors';
import { reducer, sliceKey } from './slice';

const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

export function ActsPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: actsPageSaga });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const pathParams = useParams<{ id: string }>();

  const selectedCompetition = useSelector(selectSelectedCompetition);
  const acts = useSelector(selectActs);
  const ratings = useSelector(selectRatings);
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const actUserRatings = new Map(
    acts.map(act => [
      act.id,
      ratings
        .filter(rating => rating.actId === act.id)
        .map(rating => ({
          rating,
          user: users.find(user => user.id === rating.userId),
        })),
    ]),
  );

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(competitionListPageActions.selectCompetition(pathParams.id));
  });

  const handleRefresh = () => {
    dispatch(competitionListPageActions.selectCompetition(pathParams.id));
  };

  return (
    <>
      <Helmet>
        <title>{t(...messages.actsTitle)}</title>
        <meta name="description" content="Description of ActsPage" />
      </Helmet>
      <Grid container direction="column" justify="center" alignItems="stretch">
        {error && (
          <SimpleSnackbar
            severity="error"
            open={!!error}
            description={getApiError(t, error)}
          />
        )}
        {!!selectedCompetition && (
          <CompetitionItem competition={selectedCompetition} />
        )}
        <Grid item>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h2">{t(...messages.actsTitle)}</Typography>
            <div className={classes.buttonWrapper}>
              <IconButton color="inherit" onClick={handleRefresh}>
                <Replay />
              </IconButton>
              {isLoading && (
                <CircularProgress
                  size={48}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
        </Grid>
        {!!acts?.length &&
          acts.map(act => (
            <ActItem
              key={act.id}
              act={act}
              userRatings={actUserRatings.get(act.id) ?? []}
            />
          ))}
      </Grid>
    </>
  );
}
