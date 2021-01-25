/**
 *
 * ActItem
 *
 */
import { Act, Rating } from '@hyperremix/song-contest-rater-model';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ExpandMore, Person } from '@material-ui/icons';
import clsx from 'clsx';
import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'session/selectors';
import { RatingChipList } from '../../components/act/RatingChipList/Loadable';

interface Props {
  act: Act;
  ratings: Rating[];
}

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  media: {
    minWidth: 140,
    borderBottomRightRadius: theme.spacing(0.5),
  },
  mainContent: {
    display: 'flex',
  },
  artist: {
    marginLeft: theme.spacing(0.5),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export function ActItem({ act, ratings }: Props) {
  const classes = useStyles();

  const user = useSelector(selectUser);

  const image = act.imageUrl
    ? act.imageUrl
    : `${process.env.PUBLIC_URL}/logo192.png`;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <Grid item className={classes.mainContent}>
            <CardMedia
              className={classes.media}
              image={image}
              title={act.artistName}
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                {act.songName}
              </Typography>
              <Grid container>
                <Person />
                <Typography className={classes.artist}>
                  {act.artistName}
                </Typography>
              </Grid>
            </CardContent>
          </Grid>
          <Grid item>
            <CardActions disableSpacing>
              <RatingChipList
                rating={ratings.find(r => r.userId === user?.id)}
              />
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
              >
                <ExpandMore />
              </IconButton>
            </CardActions>
          </Grid>
          <Grid item>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography>!!! Under Construction !!!</Typography>
              </CardContent>
            </Collapse>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
