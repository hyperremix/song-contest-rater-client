/**
 *
 * NavBar
 *
 */

import {
  AppBar,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { LanguagePicker } from '../LanguagePicker';
import { ThemePicker } from '../ThemePicker';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function NavBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Song Contest Rater
          </Typography>
          <Button color="inherit">
            <AccountCircle />
          </Button>
          <Button
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVert />
          </Button>
          <Menu
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
          >
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
            >
              <MenuItem disableRipple>
                <ThemePicker />
              </MenuItem>
              <MenuItem disableRipple>
                <LanguagePicker />
              </MenuItem>
            </Grid>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}
