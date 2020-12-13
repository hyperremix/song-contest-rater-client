/**
 *
 * ActsPage
 *
 */

import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { ApiErrorText } from '../ApiErrorText';
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
      {isLoading && <LoadingIndicator />}
      {acts?.length ? (
        <List>
          {acts.map(act => (
            <ActItem
              key={act.id}
              artistName={act.artistName}
              songName={act.songName}
            />
          ))}
        </List>
      ) : error ? (
        <ApiErrorText error={error} />
      ) : null}
    </>
  );
}

const List = styled.div``;
