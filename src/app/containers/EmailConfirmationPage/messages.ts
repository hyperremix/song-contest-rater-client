/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  emailConfirmationTitle: _t(
    translations.emailConfirmation.title,
    'Email Confirmation',
  ),
  emailConfirmationLabel: _t(
    translations.emailConfirmation.emailConfirmation,
    'Email Confirmation',
  ),
  codeLabel: _t(translations.emailConfirmation.code, 'Code'),
  confirmLabel: _t(translations.emailConfirmation.confirm, 'Confirm'),
  emailLabel: _t(translations.loginPage.email, 'Email Address'),
  emailConfirmationDescriptionHeader: _t(
    translations.emailConfirmation.descriptionHeader,
    'Almost there...',
  ),
  emailConfirmationDescription: _t(
    translations.emailConfirmation.description,
    'You just received an email containing your confirmation code. Enter the code below to activate your account.',
  ),
};
