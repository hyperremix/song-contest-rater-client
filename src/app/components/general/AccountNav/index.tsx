/**
 *
 * AccountNav
 *
 */
import { Button, Typography } from '@material-ui/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../../../session/selectors';
import { UnstyledLink } from '../UnstyledLink';
import { UserAvatar } from '../UserAvatar/Loadable';
import { messages } from './messages';

export function AccountNav() {
  const { t } = useTranslation();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return isLoggedIn ? (
    <Button color="inherit">
      <UnstyledLink to="/account">
        <UserAvatar user={user}></UserAvatar>
      </UnstyledLink>
    </Button>
  ) : (
    <Button color="inherit">
      <UnstyledLink to="/signin">
        <Typography>{t(...messages.signInLabel)}</Typography>
      </UnstyledLink>
    </Button>
  );
}
