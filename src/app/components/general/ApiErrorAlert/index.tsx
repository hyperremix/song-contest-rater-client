/**
 *
 * ApiErrorAlert
 *
 */

import { Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { TFunction } from 'i18next';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ApiError } from '../../../../types';
import { messages } from './messages';

interface Props {
  error: ApiError;
}

export function ApiErrorAlert(props: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Box mt={1}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {getApiError(t, props.error)}
        </Alert>
      </Box>
    </>
  );
}

export const getApiError = (t: TFunction, error: ApiError) => {
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
