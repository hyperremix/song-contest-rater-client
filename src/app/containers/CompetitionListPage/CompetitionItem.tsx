/**
 *
 * CompetitionItem
 *
 */
import { Competition } from '@hyperremix/song-contest-rater-model';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { SmartDateTime } from '../../components/SmartDateTime';

interface Props {
  competition: Competition;
}

const useStyles = makeStyles({
  media: {
    minHeight: 200,
  },
  country: {
    marginLeft: '0.5rem',
  },
});

export function CompetitionItem({ competition }: Props) {
  const classes = useStyles();

  const image = competition.imageUrl
    ? competition.imageUrl
    : `${process.env.PUBLIC_URL}/logo192.png`;

  return (
    <>
      <Box m={1}>
        <Card>
          <CardMedia
            className={classes.media}
            image={image}
            title={competition.cityName}
          />
          <CardContent>
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
                <Typography variant="h3">{competition.description}</Typography>
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
                      <Typography>{competition.cityName}</Typography>
                      <Typography variant="h5" className={classes.country}>
                        {competition.countryName}
                      </Typography>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
