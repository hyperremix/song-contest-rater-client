import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';
import { themes } from './themes';

const selectDomain = (state: RootState) => state.theme || initialState;

export const selectTheme = createSelector([selectDomain], theme =>
  theme.isLightTheme ? themes.light : themes.dark,
);

export const selectThemeKey = createSelector(
  [selectDomain],
  theme => theme.isLightTheme,
);
