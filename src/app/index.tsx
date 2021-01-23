/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Container } from '@material-ui/core';
import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { sessionSaga } from 'session/saga';
import { reducer, sessionActions, sliceKey } from 'session/slice';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { NotFoundPage } from './components/general/NotFoundPage/Loadable';
import { AccountPage } from './containers/AccountPage/Loadable';
import { ActsPage } from './containers/ActsPage/Loadable';
import { CompetitionListPage } from './containers/CompetitionListPage/Loadable';
import { EmailConfirmationPage } from './containers/EmailConfirmationPage/Loadable';
import { ForgotPasswordPage } from './containers/ForgotPasswordPage/Loadable';
import { ForgotPasswordSubmitPage } from './containers/ForgotPasswordSubmitPage/Loadable';
import { LoginPage } from './containers/LoginPage/Loadable';
import { NavBar } from './containers/NavBar';
import { SignUpPage } from './containers/SignUpPage/Loadable';

export function App() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: sessionSaga });
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(sessionActions.tryGetUser());
  });

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
          <Route exact path="/" component={CompetitionListPage} />
          <Route exact path="/signin" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route
            exact
            path="/emailconfirmation"
            component={EmailConfirmationPage}
          />
          <Route exact path="/forgotpassword" component={ForgotPasswordPage} />
          <Route
            exact
            path="/forgotpasswordsubmit"
            component={ForgotPasswordSubmitPage}
          />
          <Route exact path="/account" component={AccountPage} />
          <Route exact path="/competitions/:id" component={ActsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
