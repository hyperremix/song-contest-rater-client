/**
 *
 * ActItem
 *
 */
import { Act, Rating, User } from '@hyperremix/song-contest-rater-model';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Slide,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import { TransitionProps } from '@material-ui/core/transitions';
import { Close, Person, Replay } from '@material-ui/icons';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUser } from 'session/selectors';
import { ratingSum } from 'utils/ratingSum';
import { RatingChipList } from '../../components/act/RatingChipList/Loadable';
import { RatingForm } from '../../components/act/RatingForm/Loadable';
import { UserRatingsDataGrid } from '../../components/act/UserRatingsDataGrid/Loadable';
import { UserAvatarGroup } from '../../components/general/UserAvatarGroup/Loadable';
import { competitionListPageActions } from '../CompetitionListPage/slice';
import { messages } from './messages';
import { selectSelectedAct, selectSelectedRating } from './selectors';
import { actsPageActions } from './slice';

interface Props {
  act: Act;
  userRatings: { rating: Rating; user?: User }[];
}

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  media: {
    height: '100%',
    width: '100%',
    borderBottomRightRadius: theme.spacing(1),
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
  dialogAppBar: {
    position: 'relative',
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  collectiveRating: {
    backgroundColor: theme.palette.grey[700],
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1),
    boxShadow: theme.shadows[3],
  },
  actInfoContainer: {
    height: '100%',
  },
  actInfo: {
    padding: theme.spacing(1.5, 1),
  },
  totalRatingChip: {
    backgroundColor: yellow[700],
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ActItem({ act, userRatings }: Props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pathParams = useParams<{ id: string }>();
  const theme = useTheme();

  const user = useSelector(selectUser);
  const selectedAct = useSelector(selectSelectedAct);
  const selectedRating = useSelector(selectSelectedRating);

  const collectiveRating = userRatings.reduce(
    (sum, userRating) => sum + ratingSum(userRating.rating),
    0,
  );

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = () => {
    dispatch(competitionListPageActions.selectCompetition(pathParams.id));
  };

  const styles = {
    totalRating: {
      marginLeft: userRatings.length > 0 ? theme.spacing(2) : 0,
    },
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
            <Grid container justify="space-between">
              <Grid item sm={7}>
                <Grid container className={classes.actInfoContainer}>
                  <Grid item xs={4}>
                    <CardMedia
                      className={classes.media}
                      image={image}
                      title={act.artistName}
                    />
                  </Grid>
                  <Grid item xs={8} className={classes.actInfo}>
                    <Grid container>
                      <Typography variant="h5" component="h2">
                        {act.songName}
                      </Typography>
                      <Grid container>
                        <Person />
                        <Typography className={classes.artist}>
                          {act.artistName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <CardContent>
                  <Box className={classes.collectiveRating}>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item>
                        <UserAvatarGroup
                          users={userRatings.map(ur => ur.user)}
                          max={5}
                        />
                      </Grid>
                      <Grid item style={styles.totalRating}>
                        <Grid
                          container
                          direction="column"
                          justify="center"
                          alignItems="center"
                        >
                          <Typography>Total</Typography>
                          <Chip
                            className={classes.totalRatingChip}
                            label={collectiveRating}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <CardActions disableSpacing>
              <Grid container justify="space-between">
                <Grid item sm={6} className={classes.cardActions}>
                  <RatingChipList
                    rating={
                      userRatings.find(r => r.user?.id === user?.id)?.rating
                    }
                  />
                </Grid>
                <Grid item sm={6} className={classes.cardActions}>
                  <Grid container justify="flex-end">
                    <Button
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={handleClickOpen}
                    >
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
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.dialogAppBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose}>
                <Close />
              </IconButton>
              <Typography variant="h6" className={classes.dialogTitle}>
                {t(...messages.summaryOverlayTitle)}
              </Typography>
              <IconButton color="inherit" onClick={handleRefresh}>
                <Replay />
              </IconButton>
            </Toolbar>
          </AppBar>
          <UserRatingsDataGrid userRatings={userRatings} />
        </Dialog>
      </Card>
    </>
  );
}
