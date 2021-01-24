/**
 *
 * CompetitionList
 *
 */
import { Competition } from '@hyperremix/song-contest-rater-model';
import { Box, Typography } from '@material-ui/core';
import * as React from 'react';
import { CompetitionItem } from '../../competition/CompetitionItem';

interface Props {
  header: string;
  competitions: Competition[];
}

export function CompetitionList({ header, competitions }: Props) {
  return (
    <>
      <Box paddingBottom={2}>
        <Typography variant="h2">{header}</Typography>
      </Box>
      {competitions.map(item => (
        <CompetitionItem key={item.id} competition={item} isClickable />
      ))}
    </>
  );
}
