/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  cancelButtonLabel: _t(translations.acts.cancelButton, 'Cancel'),
  saveRatingButtonLabel: _t(translations.acts.saveRatingButton, 'Save Rating'),
  songLabel: _t(translations.acts.songLabel, 'Song'),
  singingLabel: _t(translations.acts.singingLabel, 'Singing'),
  showLabel: _t(translations.acts.showLabel, 'Show'),
  looksLabel: _t(translations.acts.looksLabel, 'Looks'),
  clothesLabel: _t(translations.acts.clothesLabel, 'Clothes'),
};
