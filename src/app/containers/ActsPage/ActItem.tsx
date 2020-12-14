/**
 *
 * ActItem
 *
 */
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import * as React from 'react';

interface Props {
  artistName: string;
  songName: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  media: {
    minWidth: 140,
  },
});

export function ActItem({ artistName, songName }: Props) {
  const classes = useStyles();

  return (
    <>
      <Box m={1}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image="https://i2.wp.com/escxtra.com/wp-content/uploads/mans-melkweg.jpeg?resize=780%2C405&ssl=1"
            title={artistName}
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {songName}
            </Typography>
            <Typography>{artistName}</Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
