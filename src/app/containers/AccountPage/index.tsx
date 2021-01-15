/**
 *
 * AccountPage
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
import { Email } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { tryUpdateUser } from 'session/saga';
import { reducer, sessionActions, sliceKey } from 'session/slice';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useFormFields } from 'utils/useFormFields';
import {
  selectError,
  selectLoading,
  selectUser,
} from '../../../session/selectors';
import { messages } from './messages';

const useStyles = makeStyles(theme => ({
  avatar: {
    marginBottom: theme.spacing(3),
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  emailContainer: {
    marginTop: theme.spacing(1),
  },
  emailIcon: {
    marginRight: theme.spacing(1),
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

export function AccountPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: tryUpdateUser });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [{ firstname, lastname }, handleFieldChange] = useFormFields({
    firstname: user?.firstname,
    lastname: user?.lastname,
  });

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    if (firstname?.trim().length > 0 && lastname?.trim().length > 0) {
      dispatch(
        sessionActions.tryUpdateUser({
          firstname,
          lastname,
        }),
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>{t(...messages.accountTitle)}</title>
        <meta name="description" content="Description of AccountPage" />
      </Helmet>
      <Container maxWidth="xs">
        <form className={classes.form} noValidate onSubmit={onSubmitForm}>
          <Grid container spacing={2}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Avatar className={classes.avatar}></Avatar>
              </Grid>
            </Grid>

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
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.emailContainer}
            >
              <Email className={classes.emailIcon} />
              <Typography component="h1" variant="h6" align="justify">
                {`${user?.email}`}
              </Typography>
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
                  {t(...messages.updateButton)}
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
      </Container>
    </>
  );
}
