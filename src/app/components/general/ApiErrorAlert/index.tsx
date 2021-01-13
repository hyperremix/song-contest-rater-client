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
import { ResponseError } from 'utils/types';
import { messages } from './messages';

interface Props {
  error: Error;
}

export function ApiErrorAlert(props: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Box mt={1}>
        <Alert severity="error" variant="filled">
          <AlertTitle>Error</AlertTitle>
          {getApiError(t, props.error)}
        </Alert>
      </Box>
    </>
  );
}

export const getApiError = (t: TFunction, error: Error): string => {
  if (!(error instanceof ResponseError)) {
    return t(...messages.defaultErrorText);
  }

  switch (error.response.status) {
    case 400:
      return t(...messages.badRequestErrorText);
    case 401:
      return t(...messages.unauthorizedErrorText);
    case 403:
      return t(...messages.forbiddenErrorText);
    case 404:
      return t(...messages.notFoundErrorText);
    case 422:
      return t(...messages.unprocessableEntityErrorText);
    case 500:
      return t(...messages.internalServerErrorText);
    default:
      return t(...messages.defaultErrorText);
  }
};
