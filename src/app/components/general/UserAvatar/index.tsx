/**
 *
 * UserAvatar
 *
 */
import { User } from '@hyperremix/song-contest-rater-model';
import { Avatar, makeStyles, useTheme } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

interface Props {
  user?: User | null;
  size?: number;
}

export function UserAvatar({ user, size }: Props) {
  const classes = useStyles();
  const theme = useTheme();

  const initials =
    getFirstCharacter(user?.firstname) + getFirstCharacter(user?.lastname);

  const styles = {
    avatar: {
      width: theme.spacing(size ?? 5),
      height: theme.spacing(size ?? 5),
    },
  };

  return (
    <Avatar
      alt={`${user?.firstname} ${user?.lastname}`}
      className={classes.avatar}
      src={user?.useGravatar ? user?.gravatarUrl : user?.avatarUrl}
      style={styles.avatar}
    >
      {initials}
    </Avatar>
  );
}

const getFirstCharacter = (name: string | undefined): string =>
  name ? name.slice(0, 1) : '?';
