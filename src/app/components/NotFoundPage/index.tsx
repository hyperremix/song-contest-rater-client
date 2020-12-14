import { Grid, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

const useStyles = makeStyles({
  root: {
    height: '90vh',
  },
});

export function NotFoundPage() {
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>404 {t(...messages.pageNotFoundError)}</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Typography variant="h1">
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Typography>
        <Typography>{t(...messages.pageNotFoundError)}.</Typography>
      </Grid>
    </>
  );
}
