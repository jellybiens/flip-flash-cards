import * as React from 'react';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Icons } from '../definitions';
import { LanguageDropdown, LanguageDropdownProps } from './LanguageDropdown';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      minWidth: 250,
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
    select: {
      width: '100%',
    },
  };
});

export type SettingsDrawerProps = {
  open: boolean;
  setOpen: (open) => void;
  navigation?: {
    browseDecks: () => void;
    mydecks: () => void;
    createdeck: () => void;
    about: () => void;
    cleardata: () => void;
  };
};

export const SettingsDrawer: React.FC<SettingsDrawerProps & LanguageDropdownProps> = ({
  open,
  setOpen,
  navigation,
  ...languageProps
}) => {
  const cs = useStyles();

  const Close = Icons.cross;
  const Language = Icons.translate;

  const BrowseDecks = Icons.browse;
  const MyDecks = Icons.myDecks;
  const CreateDeck = Icons.create;

  // const Legal = Icons.law;
  const Info = Icons.info;
  const ClearData = Icons.deleteAll;

  const close = () => setOpen(false);

  return (
    <Drawer anchor="right" open={open} onClose={close}>
      <div className={cs.root}>
        <List>
          <ListItem key="language-select">
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <LanguageDropdown {...languageProps} className={cs.select} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="browse-decks" onClick={navigation?.browseDecks}>
            <ListItemIcon>
              <BrowseDecks />
            </ListItemIcon>
            <ListItemText primary="Browse Decks" />
          </ListItem>
          <ListItem button key="my-decks" onClick={navigation?.mydecks}>
            <ListItemIcon>
              <MyDecks />
            </ListItemIcon>
            <ListItemText primary="My Decks" />
          </ListItem>
          <ListItem button key="create-deck" onClick={navigation?.createdeck}>
            <ListItemIcon>
              <CreateDeck />
            </ListItemIcon>
            <ListItemText primary="Create Deck" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="about" onClick={navigation?.about}>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button key="close" onClick={close}>
            <ListItemIcon>
              <Close />
            </ListItemIcon>
            <ListItemText primary="Close" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="clear-data" onClick={navigation?.cleardata}>
            <ListItemIcon>
              <ClearData />
            </ListItemIcon>
            <ListItemText primary="Clear Data" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
