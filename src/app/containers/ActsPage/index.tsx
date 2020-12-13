/**
 *
 * ActsPage
 *
 */

import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { ActItem } from './ActItem';
import { actsPageSaga } from './saga';
import { selectActs, selectError, selectLoading } from './selectors';
import { actsPageActions, reducer, sliceKey } from './slice';

export function ActsPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: actsPageSaga });

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
        <title>ActsPage</title>
        <meta name="description" content="Description of ActsPage" />
      </Helmet>
      {isLoading && <span>Loading...</span>}
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
        <ErrorText>{error}</ErrorText>
      ) : null}
    </>
  );
}

const List = styled.div``;

const ErrorText = styled.span``;
