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
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from '@material-ui/lab';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useFormFields } from '../../../utils/useFormFields';
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
    marginTop: theme.spacing(1),
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
}));

export function LoginPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: tryLoginSaga });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [{ username, password }, handleFieldChange] = useFormFields({
    username: '',
    password: '',
  });

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    if (username?.trim().length > 0 && password?.trim().length > 0) {
      dispatch(loginPageActions.tryLogin({ username, password, history }));
    }
  };

  return (
    <>
      <Helmet>
        <title>{t(...messages.loginTitle)}</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Container maxWidth="xs">
        <Grid container direction="column" justify="center" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t(...messages.signInLabel)}
          </Typography>
          <Box
            visibility={error ? 'visible' : 'hidden'}
            width="100%"
            marginTop={1}
          >
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          </Box>

          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={t(...messages.emailLabel)}
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleFieldChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <Link href="/forgotpassword" variant="body2">
              {t(...messages.forgotPasswordLabel)}
            </Link>
          </form>
        </Grid>
      </Container>
    </>
  );
}
