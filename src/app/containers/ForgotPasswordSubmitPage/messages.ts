/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  forgotPasswordSubmitTitle: _t(
    translations.forgotPasswordSubmitPage.title,
    'Change Password',
  ),
  forgotPasswordSubmitLabel: _t(
    translations.forgotPasswordSubmitPage.forgotPasswordSubmit,
    'Change Password',
  ),
  emailLabel: _t(translations.loginPage.email, 'Email Address'),
  passwordLabel: _t(translations.loginPage.password, 'Password'),
  codeLabel: _t(translations.forgotPasswordSubmitPage.code, 'Code'),
  submitLabel: _t(
    translations.forgotPasswordSubmitPage.submit,
    'Change Password',
  ),
  togglePasswordVisibility: _t(
    translations.forgotPasswordSubmitPage.togglePasswordVisibility,
    'toggle password visibility',
  ),
  forgotPasswordSubmitDescriptionHeader: _t(
    translations.forgotPasswordSubmitPage.descriptionHeader,
    'Almost there...',
  ),
  forgotPasswordSubmitDescription: _t(
    translations.forgotPasswordSubmitPage.description,
    'You just received an email containing your reset code. Enter the code along with a new password below in order to change your password.',
  ),
};
