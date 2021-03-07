import * as React from 'react';
import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
} from '@material-ui/core';
import { Typography } from './Typography';
import { Icons } from '../definitions';
import { donation } from '../images';

const donationMsg = (
  <>
    <Typography variant="body1" font="secondary">
      If you enjoy what we're doing, please consider helping to fund this project.
    </Typography>
    <Typography variant="body1" font="secondary">
      Thank You.
    </Typography>
  </>
);

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      whiteSpace: 'nowrap',
      [theme.breakpoints.down('sm')]: { ...theme.typography.body2 },
      [theme.breakpoints.only('md')]: { ...theme.typography.body1 },
      [theme.breakpoints.up('lg')]: { ...theme.typography.h4 },
    },
    alignRight: {
      display: 'flex',
      position: 'absolute',
      right: theme.spacing(3),
    },
    donateContainer: {
      marginRight: 2,
      width: 90,
    },
    donationImage: {
      paddingBottom: 2,
      display: 'flex',
      margin: 'auto',
      height: 24,
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.05)',
        '&:active': {
          transform: 'scale(0.95)',
        },
      },
    },
  };
});

export type AppHeaderProps = {
  open: boolean;
  setOpen: (open) => void;
  navigation?: {
    paypal: () => void;
    bitcoin: () => void;
    ethereum: () => void;
  };
};

export const AppHeader: React.FC<AppHeaderProps> = ({ open, setOpen, navigation }) => {
  const cs = useStyles();

  const MenuIcon = Icons.menu;
  const CloseIcon = Icons.closeMenu;

  return (
    <AppBar position="fixed">
      <Toolbar>
        <div className={cs.alignRight}>
          <Tooltip title={donationMsg} arrow>
            <Grid container className={cs.donateContainer}>
              <Grid item xs={12}>
                <img
                  src={donation.paypal}
                  className={cs.donationImage}
                  onClick={navigation?.paypal}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src={donation.btc}
                  className={cs.donationImage}
                  onClick={navigation?.paypal}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src={donation.eth}
                  className={cs.donationImage}
                  onClick={navigation?.paypal}
                />
              </Grid>
            </Grid>
          </Tooltip>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setOpen(!open)}
          >
            {!open ? <MenuIcon /> : <CloseIcon />}
          </IconButton>
        </div>

        <Typography variant="h4" noWrap>
          FlipFlasCards
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
