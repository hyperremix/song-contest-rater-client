import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core';

const lightTheme: Theme = createMuiTheme();
const darkTheme: Theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export const themes = {
  light: responsiveFontSizes(lightTheme),
  dark: responsiveFontSizes(darkTheme),
};
