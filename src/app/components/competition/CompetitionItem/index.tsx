/**
 *
 * CompetitionItem
 *
 */
import { Competition } from '@hyperremix/song-contest-rater-model';
import {
  Box,
  ButtonBase,
  Card,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
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
  isClickable?: boolean;
}

const useStyles = makeStyles(theme => ({
  buttonBase: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  card: {
    width: '100%',
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

export function CompetitionItem({ competition, isClickable }: Props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [elevation, setElevation] = useState<number>(1);

  const onMouseOver = () => {
    setElevation(15);
  };

  const onMouseOut = () => {
    setElevation(1);
  };

  const styles = {
    card: {
      backgroundImage: `url(${competition.imageUrl})`,
      cursor: isClickable ? 'pointer' : 'auto',
    },
  };

  const onClick = () => {
    dispatch(
      competitionListPageActions.selectCompetition({
        id: competition.id,
        history,
      }),
    );
  };

  return (
    <>
      <ButtonBase className={classes.buttonBase} disableRipple={!isClickable}>
        <Card
          onMouseOver={isClickable ? onMouseOver : () => {}}
          onMouseOut={isClickable ? onMouseOut : () => {}}
          onClick={isClickable ? onClick : () => {}}
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
      </ButtonBase>
    </>
  );
}
