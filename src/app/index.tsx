/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Container } from '@material-ui/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { ActsPage } from './containers/ActsPage/Loadable';
import { HomePage } from './containers/HomePage/Loadable';
import { NavBar } from './containers/NavBar';

export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Song Contest Rater"
        defaultTitle="Song Contest Rater"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A song contest rater application" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>

      <NavBar />
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/acts" component={ActsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
