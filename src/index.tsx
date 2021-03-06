/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Import root app
import { CssBaseline } from '@material-ui/core';
import { App } from 'app';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
// Use consistent styling
import 'sanitize.css/sanitize.css';
import * as serviceWorker from 'serviceWorker';
import { configureAppStore } from 'store/configureStore';
import { ThemeProvider } from 'styles/theme';
// Initialize languages
import './locales/i18n';
import { configureAuth } from './utils/configureAuth';

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

configureAuth();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <HelmetProvider>
        <CssBaseline />
        <App />
      </HelmetProvider>
    </ThemeProvider>
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
