/**
 *
 * PlacementIndicator
 *
 */
import { Box, Icon, makeStyles, Typography } from '@material-ui/core';
import { brown } from '@material-ui/core/colors';
import * as React from 'react';

const useStyles = makeStyles(theme => ({
  outer: {
    position: 'absolute',
    top: -20,
    right: -20,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  textBox: {
    position: 'absolute',
    top: 4,
    left: 0,
  },
}));

interface Props {
  placement: number;
}

export function PlacementIndicator({ placement }: Props) {
  const classes = useStyles();

  const style = {
    icon: {
      width: '45px',
      color: getPlacementColor(placement),
    },
  };

  return (
    <div className={classes.outer}>
      <div className={classes.wrapper}>
        <Icon
          className="fa fa-crown"
          fontSize="large"
          color="secondary"
          style={style.icon}
        />
        <Box
          width="45px"
          height="36px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.textBox}
        >
          <Typography display="inline">
            {placement === 0 ? '-' : placement}
          </Typography>
        </Box>
      </div>
    </div>
  );
}

const getPlacementColor = (placement: number): string => {
  if (placement === 1) {
    return '#C9B037';
  }

  if (placement === 2) {
    return '#B4B4B4';
  }

  if (placement === 3) {
    return '#AD8A56';
  }

  return brown[500];
};
