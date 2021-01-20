/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  accountTitle: _t(translations.accountPage.title, 'Account'),
  firstnameLabel: _t(translations.loginPage.firstname, 'First Name'),
  lastnameLabel: _t(translations.loginPage.lastname, 'Last Name'),
  updateButton: _t(translations.accountPage.updateButton, 'Update Info'),
  imageTooLargeError: _t(
    translations.accountPage.imageTooLargeError,
    'Only images up to 2 MB are supported.',
  ),
};
