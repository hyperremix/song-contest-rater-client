/**
 *
 * ForgotPasswordSubmitPage
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
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from '@material-ui/lab';
import qs from 'qs';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useFormFields } from '../../../utils/useFormFields';
import { messages } from './messages';
import { tryForgotPasswordSubmit } from './saga';
import { selectError, selectLoading } from './selectors';
import { forgotPasswordSubmitPageActions, reducer, sliceKey } from './slice';

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
  descriptionHeader: {
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
}));

export function ForgotPasswordSubmitPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: tryForgotPasswordSubmit });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  const forgotPasswordEmail = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }).email;
  const [{ email, code, password }, handleFieldChange] = useFormFields({
    email: forgotPasswordEmail,
    code: '',
    password: '',
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    if (email?.trim().length > 0 && code?.trim().length > 0) {
      dispatch(
        forgotPasswordSubmitPageActions.tryForgotPasswordSubmit({
          email,
          code,
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
        <title>{t(...messages.forgotPasswordSubmitTitle)}</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Container maxWidth="xs">
        <Grid container direction="column" justify="center" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t(...messages.forgotPasswordSubmitLabel)}
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
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.descriptionHeader}>
                  {t(...messages.forgotPasswordSubmitDescriptionHeader)}
                </Typography>
                <Typography className={classes.description}>
                  {t(...messages.forgotPasswordSubmitDescription)}
                </Typography>
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
                  name="code"
                  label={t(...messages.codeLabel)}
                  id="code"
                  autoFocus
                  value={code}
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
                    {t(...messages.submitLabel)}
                  </Button>
                  {isLoading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
}
