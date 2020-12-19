/**
 *
 * CompetitionItem
 *
 */
import { Competition } from '@hyperremix/song-contest-rater-model';
import { Box, Card, Grid, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SmartDateTime } from '../../general/SmartDateTime';

interface Props {
  competition: Competition;
}

const useStyles = makeStyles(() => ({
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
        'linear-gradient(to top, #000, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0) 50%)',
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
    marginLeft: '0.5rem',
  },
}));

export function CompetitionItem({ competition }: Props) {
  const classes = useStyles();
  const { t } = useTranslation();

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

  return (
    <>
      <Box paddingBottom={1}>
        <Card
          onMouseOver={handleOnMouseOver}
          onMouseOut={handleOnMouseOut}
          elevation={elevation}
          style={styles.card}
          className={classes.card}
        >
          <Box className={classes.content} px={2} paddingBottom={1}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="stretch"
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography variant="h3">
                  {t(`competitionDescriptions.${competition.description}`)}
                </Typography>
              </Box>
              <Box>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="stretch"
                >
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <SmartDateTime date={competition.startTime} />
                  </Box>
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
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Card>
      </Box>
    </>
  );
}
