/**
 *
 * ApiErrorText
 *
 */

import { TFunction } from 'i18next';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { ApiError } from '../../../types';
import { messages } from './messages';

interface Props {
  error: ApiError;
}

export function ApiErrorText(props: Props) {
  const { t } = useTranslation();

  return (
    <>
      <ErrorText>{apiErrorText(t, props.error)}</ErrorText>
    </>
  );
}

export const apiErrorText = (t: TFunction, error: ApiError) => {
  switch (error) {
    case ApiError.NOT_FOUND:
      return t(...messages.notFoundErrorText);
    case ApiError.EMPTY_LIST:
      return t(...messages.emptyListErrorText);
    case ApiError.RESPONSE_ERROR:
      return t(...messages.responseErrorText);
    default:
      return 'An unmapped error has occurred!';
  }
};

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;
