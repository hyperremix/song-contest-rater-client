/**
 *
 * ForgotPasswordPage
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
import { SimpleSnackbar } from 'app/components/general/SimpleSnackbar';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useFormFields } from '../../../utils/formHelpers';
import { messages } from './messages';
import { tryInitiateForgotPassword } from './saga';
import { selectError, selectLoading } from './selectors';
import { forgotPasswordPageActions, reducer, sliceKey } from './slice';

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

export function ForgotPasswordPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: tryInitiateForgotPassword });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  const [{ email }, handleFieldChange] = useFormFields({
    email: '',
  });

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    if (email?.trim().length > 0) {
      dispatch(
        forgotPasswordPageActions.initiateForgotPassword({ email, history }),
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>{t(...messages.passwordResetTitle)}</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Container maxWidth="xs">
        <SimpleSnackbar severity="error" open={!!error} description={error} />
        <Grid container direction="column" justify="center" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t(...messages.passwordResetLabel)}
          </Typography>

          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.descriptionHeader}>
                  {t(...messages.forgotPasswordDescriptionHeader)}
                </Typography>
                <Typography className={classes.description}>
                  {t(...messages.forgotPasswordDescription)}
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
                <Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    className={classes.submit}
                  >
                    {t(...messages.resetPasswordButton)}
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
