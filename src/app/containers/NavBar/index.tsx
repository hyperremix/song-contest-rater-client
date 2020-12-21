/**
 *
 * NavBar
 *
 */

import {
  AppBar,
  Box,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import * as React from 'react';
import { LanguagePicker } from '../../components/menu/LanguagePicker';
import { ThemePicker } from '../../components/menu/ThemePicker';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
      <Box paddingBottom={2}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Song Contest Rater
            </Typography>
            <Button color="inherit" href="/login">
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
              <MenuItem disableRipple>
                <ThemePicker />
              </MenuItem>
              <MenuItem disableRipple>
                <LanguagePicker />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
