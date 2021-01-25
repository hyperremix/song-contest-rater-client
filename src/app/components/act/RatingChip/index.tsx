/**
 *
 * RatingChip
 *
 */
import { Box, Icon, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';

interface Props {
  iconName: string;
  rating: number | undefined;
  width: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(1),
  },
}));

export function RatingChip({ iconName, rating, width }: Props) {
  const classes = useStyles();

  const styles = {
    ratingIcon: {
      width,
    },
  };

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Icon
        className={`fa fa-${iconName}`}
        fontSize="small"
        style={styles.ratingIcon}
      />
      <Typography>{rating ? rating : '-'}</Typography>
    </Box>
  );
}
