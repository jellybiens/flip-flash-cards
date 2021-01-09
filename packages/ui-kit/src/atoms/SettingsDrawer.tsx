import * as React from 'react';
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Icons } from '../definitions';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      whiteSpace: 'nowrap',
      [theme.breakpoints.down('sm')]: { ...theme.typography.body2 },
      [theme.breakpoints.only('md')]: { ...theme.typography.body1 },
      [theme.breakpoints.up('lg')]: { ...theme.typography.h4 },
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
  };
});

type SettingsDrawerProps = {
  open: boolean;
  setOpen: (open) => void;
};

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ open, setOpen }) => {
  const cs = useStyles();

  const TopRated = Icons.starFilled;
  const Trending = Icons.trending;
  const Newest = Icons.new;
  const MyDecks = Icons.myDecks;
  const CreateDeck = Icons.create;

  // const Legal = Icons.law;
  const Info = Icons.info;
  const ClearData = Icons.deleteAll;

  const close = () => setOpen(false);

  return (
    <Drawer anchor="right" open={open} onClose={close}>
      <div className={cs.root}>
        <div>
          <ListItem button key="top-rated">
            <ListItemIcon>
              <TopRated />
            </ListItemIcon>
            <ListItemText primary="Top Rated" />
          </ListItem>
          <ListItem button key="trending">
            <ListItemIcon>
              <Trending />
            </ListItemIcon>
            <ListItemText primary="Trending" />
          </ListItem>
          <ListItem button key="newest">
            <ListItemIcon>
              <Newest />
            </ListItemIcon>
            <ListItemText primary="Newest" />
          </ListItem>
          <ListItem button key="my-decks">
            <ListItemIcon>
              <MyDecks />
            </ListItemIcon>
            <ListItemText primary="My Decks" />
          </ListItem>
          <ListItem button key="create-deck">
            <ListItemIcon>
              <CreateDeck />
            </ListItemIcon>
            <ListItemText primary="Create Deck" />
          </ListItem>
        </div>
        <div className={cs.bottom}>
          <ListItem button key="about">
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          {/* <ListItem button key="legal">
            <ListItemIcon>
              <Legal />
            </ListItemIcon>
            <ListItemText primary="Legal" />
          </ListItem> */}
          <ListItem button key="clear-data">
            <ListItemIcon>
              <ClearData />
            </ListItemIcon>
            <ListItemText primary="Clear Data" />
          </ListItem>
        </div>
      </div>
    </Drawer>
  );
};
