/**
 *
 * SmartDateTime
 *
 */
import 'moment/locale/de';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import { messages } from './messages';

interface Props {
  date: Date;
}

export function SmartDateTime({ date }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const calendarStrings = {
    lastDay: `[${t(...messages.dateTimeYesterday)} ${t(
      ...messages.dateTimeAt,
    )}] LT`,
    sameDay: `[${t(...messages.dateTimeToday)} ${t(
      ...messages.dateTimeAt,
    )}] LT`,
    nextDay: `[${t(...messages.dateTimeTomorrow)} ${t(
      ...messages.dateTimeAt,
    )}] LT`,
    lastWeek: `[${t(...messages.dateTimeLast)}] dddd [${t(
      ...messages.dateTimeAt,
    )}] LT`,
    nextWeek: `[${t(...messages.dateTimeOn)}] dddd [${t(
      ...messages.dateTimeAt,
    )}] LT`,
    sameElse: `LL`,
  };

  return (
    <>
      <Moment locale={i18n.language} calendar={calendarStrings} date={date} />
    </>
  );
}
