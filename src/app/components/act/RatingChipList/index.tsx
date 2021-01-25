/**
 *
 * RatingChipList
 *
 */
import { Rating } from '@hyperremix/song-contest-rater-model';
import { Grid, makeStyles } from '@material-ui/core';
import { loadCSS } from 'fg-loadcss';
import * as React from 'react';
import { RatingChip } from '../RatingChip/Loadable';

interface Props {
  rating?: Rating;
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '300px',
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
      <RatingChip iconName="music" rating={rating?.song} width="24px" />
      <RatingChip
        iconName="microphone-alt"
        rating={rating?.singing}
        width="17px"
      />
      <RatingChip iconName="star" rating={rating?.show} width="24px" />
      <RatingChip iconName="heart" rating={rating?.looks} width="23px" />
      <RatingChip iconName="tshirt" rating={rating?.clothes} width="27px" />
    </Grid>
  );
}
