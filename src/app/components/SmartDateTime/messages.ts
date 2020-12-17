/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  dateTimeAt: _t(translations.smartDateTime.at, 'at'),
  dateTimeYesterday: _t(translations.smartDateTime.yesterday, 'Yesterday'),
  dateTimeTomorrow: _t(translations.smartDateTime.tomorrow, 'Tomorrow'),
  dateTimeToday: _t(translations.smartDateTime.today, 'Today'),
  dateTimeLast: _t(translations.smartDateTime.last, 'Last'),
  dateTimeOn: _t(translations.smartDateTime.on, 'On'),
};
