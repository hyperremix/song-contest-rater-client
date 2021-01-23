/**
 *
 * CompetitionItem
 *
 */
import { Competition } from '@hyperremix/song-contest-rater-model';
import { Box, Card, Grid, makeStyles, Typography } from '@material-ui/core';
import { LocationOn, Schedule } from '@material-ui/icons';
import { SmartDateTime } from 'app/components/general/SmartDateTime';
import { competitionListPageActions } from 'app/containers/CompetitionListPage/slice';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
interface Props {
  competition: Competition;
}

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    minWidth: 200,
    minHeight: 250,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '100%',
      bottom: 0,
      zIndex: 1,
      background:
        'linear-gradient(345deg, #000, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0) 65%)',
    },
    cursor: 'pointer',
  },
  content: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    width: '100%',
    color: 'white',
  },
  country: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dateTimeIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export function CompetitionItem({ competition }: Props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [elevation, setElevation] = useState<number>(1);

  const handleOnMouseOver = () => {
    setElevation(15);
  };

  const handleOnMouseOut = () => {
    setElevation(1);
  };

  const styles = {
    card: {
      backgroundImage: `url(${competition.imageUrl})`,
    },
  };

  const handleOnClick = () => {
    dispatch(
      competitionListPageActions.selectCompetition({
        id: competition.id,
        history,
      }),
    );
  };

  return (
    <>
      <Box paddingBottom={1}>
        <Card
          onMouseOver={handleOnMouseOver}
          onMouseOut={handleOnMouseOut}
          onClick={handleOnClick}
          elevation={elevation}
          style={styles.card}
          className={classes.card}
        >
          <Box className={classes.content} px={2} paddingBottom={1}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-end"
            >
              <Grid item>
                <Typography variant="h3">
                  {t(`competitionDescriptions.${competition.description}`)}
                </Typography>
              </Grid>
              <Grid item>
                <SmartDateTime date={competition.startTime} />
                <Schedule className={classes.dateTimeIcon} />
              </Grid>
              <Grid item>
                <Box>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Typography>
                      {t(`cities.${competition.cityName}`)}
                    </Typography>
                    <Typography variant="h5" className={classes.country}>
                      {t(`countries.${competition.countryName}`)}
                    </Typography>
                    <LocationOn />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </>
  );
}
