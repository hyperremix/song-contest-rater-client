/**
 *
 * ActItem
 *
 */
import { Act } from '@hyperremix/song-contest-rater-model';
import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import * as React from 'react';

interface Props {
  act: Act;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  media: {
    minWidth: 140,
  },
}));

export function ActItem({ act }: Props) {
  const classes = useStyles();

  const image = act.imageUrl
    ? act.imageUrl
    : `${process.env.PUBLIC_URL}/logo192.png`;

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={image}
          title={act.artistName}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {act.songName}
          </Typography>
          <Typography>{act.artistName}</Typography>
        </CardContent>
      </Card>
    </>
  );
}
