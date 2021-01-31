/**
 *
 * RatingChipList
 *
 */
import { Rating } from '@hyperremix/song-contest-rater-model';
import { Grid, makeStyles } from '@material-ui/core';
import { loadCSS } from 'fg-loadcss';
import * as React from 'react';
import { ClothesIcon } from '../../rating/ClothesIcon';
import { LooksIcon } from '../../rating/LooksIcon';
import { ShowIcon } from '../../rating/ShowIcon';
import { SingingIcon } from '../../rating/SingingIcon';
import { SongIcon } from '../../rating/SongIcon';
import { RatingChip } from '../RatingChip/Loadable';
interface Props {
  rating?: Rating;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '250px',
  },
}));

export function RatingChipList({ rating }: Props) {
  const classes = useStyles();

  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <Grid container justify="space-between" className={classes.root}>
      <RatingChip icon={<SongIcon />} rating={rating?.song} />
      <RatingChip icon={<SingingIcon />} rating={rating?.singing} />
      <RatingChip icon={<ShowIcon />} rating={rating?.show} />
      <RatingChip icon={<LooksIcon />} rating={rating?.looks} />
      <RatingChip icon={<ClothesIcon />} rating={rating?.clothes} />
    </Grid>
  );
}
