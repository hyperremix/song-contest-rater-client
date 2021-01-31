/**
 *
 * ActItem
 *
 */
import { Act, Rating } from '@hyperremix/song-contest-rater-model';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'session/selectors';
import { RatingChipList } from '../../components/act/RatingChipList/Loadable';
import { RatingForm } from '../../components/act/RatingForm/Loadable';
import { messages } from './messages';
import { selectSelectedAct, selectSelectedRating } from './selectors';
import { actsPageActions } from './slice';

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
  cardActions: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  voteButton: {
    marginLeft: theme.spacing(1),
  },
  sliderInput: {
    marginLeft: theme.spacing(1),
  },
}));

export function ActItem({ act, ratings }: Props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const selectedAct = useSelector(selectSelectedAct);
  const selectedRating = useSelector(selectSelectedRating);

  const expanded = selectedAct?.id === act.id;

  const image = act.imageUrl
    ? act.imageUrl
    : `${process.env.PUBLIC_URL}/logo192.png`;

  const handleExpandClick = () => {
    dispatch(
      actsPageActions.selectAct({
        id: act.id,
        userId: user?.id,
      }),
    );
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
              <Grid container justify="space-between">
                <Grid item sm={6} className={classes.cardActions}>
                  <RatingChipList
                    rating={ratings.find(r => r.userId === user?.id)}
                  />
                </Grid>
                <Grid item sm={6} className={classes.cardActions}>
                  <Grid container justify="flex-end">
                    <Button size="small" color="secondary" variant="contained">
                      {t(...messages.summaryButtonLabel)}
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={handleExpandClick}
                      className={classes.voteButton}
                      disabled={expanded}
                    >
                      {t(...messages.voteButtonLabel)}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
          <Grid item>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <RatingForm rating={selectedRating} />
              </CardContent>
            </Collapse>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
