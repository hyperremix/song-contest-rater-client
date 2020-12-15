import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../types/RootState';
import { themes } from './themes';
import { ThemeState } from './types';
import { getThemeFromStorage, isSystemDark } from './utils';

export const initialState: ThemeState = {
  isLightTheme: getThemeFromStorage() ?? !isSystemDark,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<boolean>) {
      state.isLightTheme = action.payload;
    },
  },
});

export const selectTheme = createSelector(
  [(state: RootState) => state.theme || initialState],
  theme => {
    return theme.isLightTheme ? themes.light : themes.dark;
  },
);

export const selectThemeKey = createSelector(
  [(state: RootState) => state.theme || initialState],
  theme => theme.isLightTheme,
);

export const { changeTheme } = themeSlice.actions;
export const reducer = themeSlice.reducer;
export const themeSliceKey = themeSlice.name;
