/**
 *
 * SubmitButton
 *
 */
import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import * as React from 'react';

interface Props {
  isLoading: boolean;
  buttonText: string;
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -12,
  },
  wrapper: {
    position: 'relative',
  },
}));

export function SubmitButton({ isLoading, buttonText }: Props) {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={isLoading}
        className={classes.button}
      >
        {buttonText}
      </Button>
      {isLoading && <CircularProgress size={24} className={classes.progress} />}
    </Box>
  );
}
