/**
 *
 * AccountPage
 *
 */

import {
  Avatar,
  Badge,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  makeStyles,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { Edit, Email } from '@material-ui/icons';
import { SimpleSnackbar } from 'app/components/general/SimpleSnackbar';
import * as React from 'react';
import { FormEvent, useCallback } from 'react';
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
import { onChangeHandler, onSubmitFormHandler } from 'utils/formHelpers';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
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
  gravatarSwitch: {
    marginLeft: theme.spacing(1),
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

  const handleOnChange = event =>
    onChangeHandler(user, sessionActions.editUser, dispatch, event);

  const onSubmitForm = (event?: FormEvent<HTMLFormElement>) =>
    onSubmitFormHandler(dispatch, sessionActions.tryUpdateUser, event);

  const onDrop = useCallback(
    (files: File[]) => {
      if (files.length === 0) {
        dispatch(
          sessionActions.updateAvatarFailed(
            new Error(t(...messages.imageTooLargeError)),
          ),
        );
        return;
      }

      dispatch(sessionActions.tryUpdateAvatar({ file: files[0] }));
    },
    [dispatch, t],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/svg+xml',
    maxSize: 2097152,
  });

  return (
    <>
      <Helmet>
        <title>{t(...messages.accountTitle)}</title>
        <meta name="description" content="Description of AccountPage" />
      </Helmet>
      <Container maxWidth="xs">
        {error && (
          <SimpleSnackbar
            severity="error"
            open={!!error}
            description={error?.message}
          />
        )}
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
                          src={
                            user?.useGravatar
                              ? `${user?.gravatarUrl}?s=300`
                              : user?.avatarUrl
                          }
                        />
                      )}
                    </Badge>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Avatar src="https://s.gravatar.com/avatar/00000000000000000000000000000000?s=80" />
                  <FormControlLabel
                    control={
                      <Switch
                        required
                        name="useGravatar"
                        id="useGravatar"
                        defaultChecked={user?.useGravatar}
                        onChange={handleOnChange}
                        color="primary"
                      />
                    }
                    label={t(...messages.useGravatarLabel)}
                    className={classes.gravatarSwitch}
                  />
                </Grid>
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
                  defaultValue={user?.firstname}
                  onChange={handleOnChange}
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
                  defaultValue={user?.lastname}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.emailContainer}
                >
                  <Email className={classes.emailIcon} />
                  <Typography component="h1" variant="h6" align="justify">
                    {user?.email}
                  </Typography>
                </Grid>
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
