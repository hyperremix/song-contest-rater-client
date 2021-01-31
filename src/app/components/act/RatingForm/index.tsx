/**
 *
 * RatingForm
 *
 */
import { Rating } from '@hyperremix/song-contest-rater-model';
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Slider,
  Typography,
} from '@material-ui/core';
import { ClothesIcon } from 'app/components/rating/ClothesIcon';
import { LooksIcon } from 'app/components/rating/LooksIcon';
import { ShowIcon } from 'app/components/rating/ShowIcon';
import { SingingIcon } from 'app/components/rating/SingingIcon';
import { SongIcon } from 'app/components/rating/SongIcon';
import {
  selectSaveRatingLoading,
  selectSelectedAct,
} from 'app/containers/ActsPage/selectors';
import { actsPageActions } from 'app/containers/ActsPage/slice';
import { selectSelectedCompetition } from 'app/containers/CompetitionListPage/selectors';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'session/selectors';
import { messages } from './messages';

const useStyles = makeStyles(theme => ({
  formActions: {
    marginTop: theme.spacing(2),
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -10,
  },
  submitWrapper: {
    position: 'relative',
  },
}));

interface Props {
  rating: Rating | null;
}

export function RatingForm({ rating }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();

  const user = useSelector(selectUser);
  const competition = useSelector(selectSelectedCompetition);
  const act = useSelector(selectSelectedAct);
  const isLoading = useSelector(selectSaveRatingLoading);

  const internalRating = {
    id: rating?.id,
    userId: user?.id,
    competitionId: competition?.id,
    actId: act?.id,
    song: 1,
    singing: 1,
    show: 1,
    looks: 1,
    clothes: 1,
    ...rating,
  };

  const [song, setSong] = React.useState<number>(internalRating.song);
  const handleSongChange = (_: any, newValue: number | number[]) => {
    setSong(newValue as number);
  };

  const [singing, setSinging] = React.useState<number>(internalRating.singing);
  const handleSingingChange = (_: any, newValue: number | number[]) => {
    setSinging(newValue as number);
  };

  const [show, setShow] = React.useState<number>(internalRating.show);
  const handleShowChange = (_: any, newValue: number | number[]) => {
    setShow(newValue as number);
  };

  const [looks, setLooks] = React.useState<number>(internalRating.looks);
  const handleLooksChange = (_: any, newValue: number | number[]) => {
    setLooks(newValue as number);
  };

  const [clothes, setClothes] = React.useState<number>(internalRating.clothes);
  const handleClothesChange = (_: any, newValue: number | number[]) => {
    setClothes(newValue as number);
  };

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    dispatch(
      actsPageActions.trySaveRating({
        id: internalRating.id,
        userId: internalRating!.userId!,
        competitionId: internalRating!.competitionId!,
        actId: internalRating!.actId!,
        song,
        singing,
        show,
        looks,
        clothes,
      }),
    );
  };

  const handleCancelRating = () => {
    dispatch(actsPageActions.unselectAct());
  };

  return (
    <form noValidate onSubmit={onSubmitForm}>
      <Grid container direction="column">
        <Grid item>
          <Typography id="input-slider">Song</Typography>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={2}>
              <SongIcon />
            </Grid>
            <Grid item xs={10}>
              <Slider
                value={song}
                aria-labelledby="input-slider"
                step={1}
                min={1}
                max={15}
                marks
                valueLabelDisplay="auto"
                onChange={handleSongChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography id="input-slider">Singing</Typography>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={2}>
              <SingingIcon />
            </Grid>
            <Grid item xs={10}>
              <Slider
                value={singing}
                aria-labelledby="input-slider"
                step={1}
                min={1}
                max={15}
                marks
                valueLabelDisplay="auto"
                onChange={handleSingingChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography id="input-slider">Show</Typography>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={2}>
              <ShowIcon />
            </Grid>
            <Grid item xs={10}>
              <Slider
                value={show}
                aria-labelledby="input-slider"
                step={1}
                min={1}
                max={15}
                marks
                valueLabelDisplay="auto"
                onChange={handleShowChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography id="input-slider">Looks</Typography>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={2}>
              <LooksIcon />
            </Grid>
            <Grid item xs={10}>
              <Slider
                value={looks}
                aria-labelledby="input-slider"
                step={1}
                min={1}
                max={15}
                marks
                valueLabelDisplay="auto"
                onChange={handleLooksChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography id="input-slider">Clothes</Typography>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={2}>
              <ClothesIcon />
            </Grid>
            <Grid item xs={10}>
              <Slider
                value={clothes}
                aria-labelledby="input-slider"
                step={1}
                min={1}
                max={15}
                marks
                valueLabelDisplay="auto"
                onChange={handleClothesChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.formActions}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Button
                type="submit"
                size="small"
                variant="contained"
                onClick={handleCancelRating}
              >
                {t(...messages.cancelButtonLabel)}
              </Button>
            </Grid>
            <Grid item>
              <div className={classes.submitWrapper}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  {t(...messages.saveRatingButtonLabel)}
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
