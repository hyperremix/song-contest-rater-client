/**
 *
 * LanguagePicker
 *
 */

import { FormControlLabel, makeStyles, Radio } from '@material-ui/core';
import { IconFlagDE, IconFlagUK } from 'material-ui-flags';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  language: {
    width: '2rem',
    height: '2rem',
  },
});

export function LanguagePicker() {
  const { i18n } = useTranslation();

  const classes = useStyles();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      <FormControlLabel
        value="end"
        control={
          <Radio
            id="en"
            name="language"
            onChange={handleLanguageChange}
            value="en"
            checked={i18n.language === 'en'}
          />
        }
        label={<IconFlagUK className={classes.language} />}
      />
      <FormControlLabel
        value="end"
        control={
          <Radio
            id="de"
            name="language"
            onChange={handleLanguageChange}
            value="de"
            checked={i18n.language === 'de'}
          />
        }
        label={<IconFlagDE className={classes.language} />}
      />
    </>
  );
}
