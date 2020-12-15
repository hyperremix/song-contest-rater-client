/**
 *
 * NavBar
 *
 */

import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, selectThemeKey } from 'styles/theme/slice';
import { saveTheme } from 'styles/theme/utils';
import { messages } from './messages';

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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLightTheme = useSelector(selectThemeKey);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    saveTheme(event.target.checked);
    dispatch(changeTheme(event.target.checked));
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
            <MenuItem>
              <Switch
                checked={isLightTheme}
                onChange={handleThemeChange}
                name="theme"
              />
              <Typography>{t(...messages.lightSwitchLabel)}</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}
