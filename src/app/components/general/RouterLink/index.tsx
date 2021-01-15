/**
 *
 * RouterLink
 *
 */
import { Link } from '@material-ui/core';
import * as React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface Props {
  to: string;
  children: any;
}

export function RouterLink({ to, children }: Props) {
  return (
    <Link component={ReactRouterLink} to={to}>
      {children}
    </Link>
  );
}
