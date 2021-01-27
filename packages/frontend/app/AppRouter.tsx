import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { AllDecksPage } from '../modules/AllDecks';
import { PlayDeckPage } from '../modules/PlayDeck';

const useStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - 64px)',
    width: '100vw',
    position: 'fixed',
    top: 64,
    left: 0,
    overflow: 'hidden',
  },
  container: {
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  pageWrapper: {
    maxWidth: 800,
    margin: 'auto',
    display: 'flex',
    height: '100%',
  },
  pageContainer: {
    margin: 'auto',
  },
}));

export const AppRouter: React.FC = () => {
  const cs = useStyles();

  return (
    <div className={cs.root}>
      <div className={cs.container}>
        <div className={cs.pageWrapper}>
          <div className={cs.pageContainer}>
            <Switch>
              <Redirect path="/" to="/AllDecks" exact />

              <Route path="/AllDecks" component={AllDecksPage} />
              <Route path="/PlayDeck/:deckId" component={PlayDeckPage} />
              <Route path="/MyDecks" component={() => <></>} />
              <Route path="/CreateDeck" component={() => <></>} />

              <Route path="/About" component={() => <></>} />
              <Route path="/ClearData" component={() => <></>} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
