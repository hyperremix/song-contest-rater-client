/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  loginTitle: _t(translations.loginPage.title, 'Sign In'),
  signInLabel: _t(translations.loginPage.signIn, 'Sign In'),
  emailLabel: _t(translations.loginPage.email, 'Email Address'),
  passwordLabel: _t(translations.loginPage.password, 'Password'),
  forgotPasswordLabel: _t(
    translations.loginPage.forgotPassword,
    'Forgot Password?',
  ),
  registerLabel: _t(
    translations.loginPage.register,
    "Don't have an account? Sign up!",
  ),
  initialSignInDescriptionHeader: _t(
    translations.loginPage.initialSignInHeader,
    'Congratulations!',
  ),
  initialSignInDescription: _t(
    translations.loginPage.initialSignInDescription,
    'You successfully created an account. Sign in using your credentials.',
  ),
};
