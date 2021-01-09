/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  passwordResetTitle: _t(
    translations.forgotPasswordPage.title,
    'Password Reset',
  ),
  passwordResetLabel: _t(
    translations.forgotPasswordPage.passwordReset,
    'Password Reset',
  ),
  emailLabel: _t(translations.loginPage.email, 'Email Address'),
  resetPasswordButton: _t(
    translations.forgotPasswordPage.resetPasswordButton,
    'Reset Password',
  ),
  forgotPasswordDescriptionHeader: _t(
    translations.forgotPasswordPage.descriptionHeader,
    'Password Forgotten?',
  ),
  forgotPasswordDescription: _t(
    translations.forgotPasswordPage.description,
    'No problem! Just enter your email below to get started with resetting the password.',
  ),
};
