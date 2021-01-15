/**
 *
 * UnstyledLink
 *
 */

import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

interface Props {
  to: string;
  children: any;
}

export function UnstyledLink({ to, children }: Props) {
  const classes = useStyles();

  return (
    <Link to={to} className={classes.link}>
      {children}
    </Link>
  );
}
