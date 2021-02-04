/**
 *
 * SimpleSnackbar
 *
 */
import { makeStyles, Slide } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { TransitionProps } from '@material-ui/core/transitions';
import { Alert, AlertTitle } from '@material-ui/lab';
import * as React from 'react';
import { SyntheticEvent, useState } from 'react';

interface Props {
  open: boolean;
  title?: string;
  description?: string | null;
  severity: 'error' | 'warning' | 'info' | 'success';
}

const useStyles = makeStyles(theme => ({
  snackBar: {
    marginTop: theme.spacing(7),
  },
}));

export function SimpleSnackbar({ open, title, description, severity }: Props) {
  const [innerOpen, setOpen] = useState(open);
  const classes = useStyles();

  const handleClose = (_: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={innerOpen}
      autoHideDuration={12000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      className={classes.snackBar}
      TransitionComponent={(props: TransitionProps) => (
        <Slide {...props} direction="down" />
      )}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {title && <AlertTitle>{title}</AlertTitle>}
        {description}
      </Alert>
    </Snackbar>
  );
}
