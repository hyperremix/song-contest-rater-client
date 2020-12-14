/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  notFoundErrorText: _t(
    translations.apiError.notFound,
    'The thing you were looking for was not found.',
  ),
  emptyListErrorText: _t(
    translations.apiError.emptyList,
    'There are no entries of this type yet.',
  ),
  responseErrorText: _t(
    translations.apiError.responseError,
    'Something went wrong.',
  ),
};