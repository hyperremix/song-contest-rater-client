/**
 *
 * LoginPage
 *
 */

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { RouterLink } from 'app/components/general/RouterLink';
import qs from 'qs';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useFormFields } from '../../../utils/formHelpers';
import { SimpleSnackbar } from '../../components/general/SimpleSnackbar';
import { messages } from './messages';
import { tryLoginSaga } from './saga';
import { selectError, selectLoading } from './selectors';
import { loginPageActions, reducer, sliceKey } from './slice';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -12,
  },
  descriptionHeader: {
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
}));

export function LoginPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: tryLoginSaga });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  const [{ email, password }, handleFieldChange] = useFormFields({
    email: '',
    password: '',
  });
  const queryString = qs.parse(location.search, { ignoreQueryPrefix: true });
  const isInitialSignIn = queryString.isInitialSignIn;
  const isPasswordReset = queryString.isPasswordReset;

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    if (email?.trim().length > 0 && password?.trim().length > 0) {
      dispatch(loginPageActions.tryLogin({ email, password, history }));
    }
  };

  return (
    <>
      <Helmet>
        <title>{t(...messages.loginTitle)}</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Container maxWidth="xs">
        <SimpleSnackbar
          severity="info"
          open={isInitialSignIn === 'true'}
          title={t(...messages.initialSignInDescriptionHeader)}
          description={t(...messages.initialSignInDescription)}
        />
        <SimpleSnackbar
          severity="info"
          open={isPasswordReset === 'true'}
          title={t(...messages.passwordResetDescriptionHeader)}
          description={t(...messages.passwordResetDescription)}
        />
        {error && (
          <SimpleSnackbar severity="error" open={!!error} description={error} />
        )}
        <Grid container direction="column" justify="center" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t(...messages.signInLabel)}
          </Typography>

          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="email"
                  label={t(...messages.emailLabel)}
                  type="email"
                  id="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label={t(...messages.passwordLabel)}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    className={classes.submit}
                  >
                    {t(...messages.signInLabel)}
                  </Button>
                  {isLoading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Box>
                <Grid container>
                  <Grid item xs>
                    <RouterLink to="/forgotpassword">
                      {t(...messages.forgotPasswordLabel)}
                    </RouterLink>
                  </Grid>
                  <Grid item>
                    <RouterLink to="/signup">
                      {t(...messages.registerLabel)}
                    </RouterLink>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
}
