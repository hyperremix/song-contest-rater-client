/**
 *
 * ThemePicker
 *
 */

import { Switch, Typography } from '@material-ui/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, selectThemeKey } from 'styles/theme/slice';
import { saveTheme } from 'styles/theme/utils';
import { messages } from './messages';

export function ThemePicker() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isLightTheme = useSelector(selectThemeKey);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    saveTheme(event.target.checked);
    dispatch(changeTheme(event.target.checked));
  };

  return (
    <>
      <Switch
        checked={isLightTheme}
        onChange={handleThemeChange}
        name="theme"
      />
      <Typography>{t(...messages.lightSwitchLabel)}</Typography>
    </>
  );
}
