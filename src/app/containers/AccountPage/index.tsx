/**
 *
 * AccountPage
 *
 */

import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Edit, Email } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import * as React from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { sessionSaga } from 'session/saga';
import {
  selectAvatarLoading,
  selectError,
  selectGetLoading,
  selectUpdateLoading,
  selectUser,
} from 'session/selectors';
import { reducer, sessionActions, sliceKey } from 'session/slice';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useFormFields } from 'utils/useFormFields';
import { SubmitButton } from '../../components/general/SubmitButton/Loadable';
import { messages } from './messages';

const useStyles = makeStyles(theme => ({
  avatar: {
    marginBottom: theme.spacing(3),
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  avatarEdit: {
    backgroundColor: theme.palette.secondary.main,
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
}));

export function AccountPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: sessionSaga });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();

  const user = useSelector(selectUser);
  const isGetLoading = useSelector(selectGetLoading);
  const isUpdateLoading = useSelector(selectUpdateLoading);
  const isAvatarLoading = useSelector(selectAvatarLoading);
  const error = useSelector(selectError);

  const [{ firstname, lastname }, handleFieldChange] = useFormFields({
    firstname: user?.firstname,
    lastname: user?.lastname,
  });

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    dispatch(
      sessionActions.tryUpdateUser({
        firstname: firstname?.trim().length > 0 ? firstname : user?.lastname,
        lastname: lastname?.trim().length > 0 ? lastname : user?.lastname,
      }),
    );
  };

  const onDrop = useCallback(
    async (files: File[]) => {
      dispatch(sessionActions.tryUpdateAvatar({ file: files[0] }));
    },
    [dispatch],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/svg+xml',
  });

  return (
    <>
      <Helmet>
        <title>{t(...messages.accountTitle)}</title>
        <meta name="description" content="Description of AccountPage" />
      </Helmet>
      <Container maxWidth="xs">
        {isGetLoading ? (
          <CircularProgress />
        ) : (
          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
            <Grid container spacing={2}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Badge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      badgeContent={
                        <Avatar className={classes.avatarEdit}>
                          <Edit />
                        </Avatar>
                      }
                    >
                      {isAvatarLoading ? (
                        <Grid
                          className={classes.avatar}
                          container
                          direction="column"
                          justify="center"
                          alignItems="center"
                        >
                          <CircularProgress size={24} />
                        </Grid>
                      ) : (
                        <Avatar
                          className={classes.avatar}
                          src={user?.avatarUrl}
                        />
                      )}
                    </Badge>
                  </div>
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
                  defaultValue={user?.firstname}
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
                  defaultValue={user?.lastname}
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
                <SubmitButton
                  isLoading={isUpdateLoading}
                  buttonText={t(...messages.updateButton)}
                ></SubmitButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Container>
    </>
  );
}
