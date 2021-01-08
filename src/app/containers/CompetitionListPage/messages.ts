/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */
import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  competitionsTitle: _t(translations.competitionList.title, 'Competitions'),
  nextCompetitionHeader: _t(translations.competitionList.nextHeader, 'Next'),
  ongoingCompetitionHeader: _t(
    translations.competitionList.ongoingHeader,
    'Ongoing',
  ),
  upcomingCompetitionHeader: _t(
    translations.competitionList.upcomingHeader,
    'Upcoming',
  ),
  previousCompetitionHeader: _t(
    translations.competitionList.previousHeader,
    'Previous',
  ),
  emptyListErrorText: _t(
    translations.apiError.emptyList,
    'There are no entries of this type yet.',
  ),
};
