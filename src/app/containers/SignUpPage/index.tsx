/**
 *
 * SignUpPage
 *
 */

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
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
import { trySignUpSaga } from './saga';
import { selectError, selectLoading } from './selectors';
import { reducer, signUpPageActions, sliceKey } from './slice';

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

export function SignUpPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: trySignUpSaga });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [
    { firstname, lastname, email, password },
    handleFieldChange,
  ] = useFormFields({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    if (email?.trim().length > 0 && password?.trim().length > 0) {
      dispatch(
        signUpPageActions.trySignUp({
          firstname,
          lastname,
          email,
          password,
          history,
        }),
      );
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>{t(...messages.signUpTitle)}</title>
        <meta name="description" content="Description of SignUpPage" />
      </Helmet>
      <Container maxWidth="xs">
        <Grid container direction="column" justify="center" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t(...messages.signUpLabel)}
          </Typography>

          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  visibility={error ? 'visible' : 'hidden'}
                  width="100%"
                  marginTop={1}
                >
                  <Alert variant="filled" severity="error">
                    {error}
                  </Alert>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="firstname"
                  label={t(...messages.firstnameLabel)}
                  id="firstname"
                  autoComplete="given-name"
                  autoFocus
                  value={firstname}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="lastname"
                  label={t(...messages.lastnameLabel)}
                  id="lastname"
                  autoComplete="family-name"
                  value={lastname}
                  onChange={handleFieldChange}
                />
              </Grid>
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
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleFieldChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={t(...messages.togglePasswordVisibility)}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                    {t(...messages.signUpButton)}
                  </Button>
                  {isLoading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Box>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    {t(...messages.existingAccount)}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
}
