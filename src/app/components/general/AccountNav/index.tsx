/**
 *
 * AccountNav
 *
 */
import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../../../session/selectors';
import { messages } from './messages';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export function AccountNav() {
  const { t } = useTranslation();
  const classes = useStyles();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const initials =
    (user?.firstname?.slice(0, 1) ?? '?') +
    (user?.lastname?.slice(0, 1) ?? '?');

  return isLoggedIn ? (
    <Button color="inherit" href="/profile">
      <Avatar className={classes.avatar}>{initials}</Avatar>
    </Button>
  ) : (
    <Button color="inherit" href="/signin">
      <Typography>{t(...messages.signInLabel)}</Typography>
    </Button>
  );
}
