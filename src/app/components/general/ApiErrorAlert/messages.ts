/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  badRequestErrorText: _t(
    translations.apiError.badRequest,
    'Unable to process request.',
  ),
  unauthorizedErrorText: _t(
    translations.apiError.unauthorized,
    'You are not authorized to perform this action.',
  ),
  forbiddenErrorText: _t(
    translations.apiError.forbidden,
    'This action is forbidden.',
  ),
  notFoundErrorText: _t(
    translations.apiError.notFound,
    'The thing you were looking for was not found.',
  ),
  unprocessableEntityErrorText: _t(
    translations.apiError.unprocessableEntity,
    'The request did not pass validation.',
  ),
  internalServerErrorText: _t(
    translations.apiError.internalServerError,
    'Something went wrong.',
  ),
  defaultErrorText: _t(
    translations.apiError.defaultError,
    'An unexpected error occurred!',
  ),
};
