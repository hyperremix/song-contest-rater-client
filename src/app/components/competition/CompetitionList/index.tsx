/**
 *
 * CompetitionList
 *
 */
import { Competition } from '@hyperremix/song-contest-rater-model';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { CompetitionItem } from '../../competition/CompetitionItem';

interface Props {
  header: string;
  competitions: Competition[];
}

export function CompetitionList({ header, competitions }: Props) {
  return (
    <>
      <Typography variant="h2">{header}</Typography>
      {competitions.map(item => (
        <CompetitionItem key={item.id} competition={item} />
      ))}
    </>
  );
}
