/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  signUpTitle: _t(translations.signUpPage.title, 'Sign Up'),
  signUpLabel: _t(translations.signUpPage.signUp, 'Sign Up'),
  firstnameLabel: _t(translations.loginPage.firstname, 'First Name'),
  lastnameLabel: _t(translations.loginPage.lastname, 'Last Name'),
  emailLabel: _t(translations.loginPage.email, 'Email Address'),
  passwordLabel: _t(translations.loginPage.password, 'Password'),
  existingAccount: _t(
    translations.signUpPage.existingAccount,
    'Already have an account? Sign in!',
  ),
  togglePasswordVisibility: _t(
    translations.signUpPage.togglePasswordVisibility,
    'toggle password visibility',
  ),
  signUpButton: _t(translations.signUpPage.signUpButton, 'Sign Up'),
};
