/**
 *
 * RatingChip
 *
 */
import { Box, Typography } from '@material-ui/core';
import * as React from 'react';

interface Props {
  rating: number | undefined;
  icon: React.ReactChild;
}

export function RatingChip({ rating, icon }: Props) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {icon}
      <Typography>{rating ? rating : '-'}</Typography>
    </Box>
  );
}
