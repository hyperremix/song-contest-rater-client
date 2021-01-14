import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const { actions: themeActions, reducer, name: sliceKey } = themeSlice;
