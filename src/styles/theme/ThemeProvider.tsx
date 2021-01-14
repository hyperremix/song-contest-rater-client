import { ThemeProvider as OriginalThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { selectTheme } from './selectors';
import { reducer, sliceKey } from './slice';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });

  const theme = useSelector(selectTheme);
  return (
    <OriginalThemeProvider theme={theme}>
      {React.Children.only(props.children)}
    </OriginalThemeProvider>
  );
};
