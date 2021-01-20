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
    (user?.firstname?.slice(0, 1) ?? '?') +
    (user?.lastname?.slice(0, 1) ?? '?');

  return (
    <Avatar
      alt={`${user?.firstname} ${user?.lastname}`}
      className={classes.avatar}
      src={user?.avatarUrl}
    >
      {initials}
    </Avatar>
  );
}
