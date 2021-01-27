import * as React from 'react';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { SettingsDrawer, Typography } from '@ui-kit';
import MenuIcon from '@material-ui/icons/Menu';

export const AppHeader: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <SettingsDrawer {...{ open, setOpen }} />
    </>
  );
};
