/**
 *
 * UserAvatar
 *
 */
import { User } from '@hyperremix/song-contest-rater-model';
import { Avatar, makeStyles } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

interface Props {
  user: User | null;
}

export function UserAvatar({ user }: Props) {
  const classes = useStyles();

  const initials =
    getFirstCharacter(user?.firstname) + getFirstCharacter(user?.lastname);

  return (
    <Avatar
      alt={`${user?.firstname} ${user?.lastname}`}
      className={classes.avatar}
      src={user?.useGravatar ? user?.gravatarUrl : user?.avatarUrl}
    >
      {initials}
    </Avatar>
  );
}

const getFirstCharacter = (name: string | undefined): string =>
  name ? name.slice(0, 1) : '?';
