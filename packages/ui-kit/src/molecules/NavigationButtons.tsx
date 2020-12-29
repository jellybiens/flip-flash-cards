import * as React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { CircleButton, ResponsiveButton } from '../atoms/Buttons';
import { FlipCardSizing } from '../definitions';
import { CardPixels } from '@types';

const useStyles = makeStyles((theme: Theme) => {
  return {
    buttonsContainer: {
      position: 'relative',
      margin: 'auto',
      [theme.breakpoints.down('sm')]: { height: `${CardPixels.sm / 2}px !important` },
      [theme.breakpoints.up('md')]: { height: `${CardPixels.md / 2}px !important` },
      ...FlipCardSizing(theme),
    },
    gridItem: {
      height: '50%',
      padding: 5,
    },
    buttonWrapper: {
      margin: 'auto',
      height: '100%',
      width: '100%',
      display: 'flex',
      '& button': {
        height: '100%',
        [theme.breakpoints.only('xs')]: {
          height: 'auto !important',
        },
        [theme.breakpoints.only('md')]: { fontSize: '1.3em' },
        [theme.breakpoints.only('lg')]: { fontSize: '1.6em' },
        [theme.breakpoints.only('xl')]: { fontSize: '2em' },
      },
      '& svg': {
        [theme.breakpoints.only('md')]: { fontSize: '1.2em !important' },
        [theme.breakpoints.only('lg')]: { fontSize: '1.3em !important' },
        [theme.breakpoints.only('xl')]: { fontSize: '1.4em !important' },
      },
    },
    rotateButtonContainer: { display: 'flex', height: '50%' },
    rotateButtonWrapper: {
      margin: 'auto',
      height: '100%',
      width: '100%',
      display: 'flex',
      [theme.breakpoints.only('sm')]: { transform: 'scale(1.3)' },
      [theme.breakpoints.up('md')]: { transform: 'scale(1.6)' },
      [theme.breakpoints.up('xl')]: { transform: 'scale(1.8)' },
    },
    rotateButton: {
      height: 'auto !important',
      position: 'relative',
      margin: 'auto',
    },
  };
});

type LoopingDeckNavigationButtonsInput = {
  creatingDeck: true;
  topCardIndex: number;
  totalCards: number;
  handleRotate: () => void;
  gotoNextCard: () => void;
  gotoPreviousCard: () => void;
  addNewCard: () => void;
  removeCard: () => void;
};

type LoopingDeckNavigationButtonsReview = {
  creatingDeck?: false;
  topCardIndex: number;
  totalCards: number;
  handleRotate: () => void;
  gotoNextCard: () => void;
  gotoPreviousCard: () => void;
  addNewCard?: undefined;
  removeCard?: undefined;
};

type LoopingDeckNavigationButtonsProps =
  | LoopingDeckNavigationButtonsInput
  | LoopingDeckNavigationButtonsReview;

export const NavigationButtons: React.FC<LoopingDeckNavigationButtonsProps> = ({
  creatingDeck = false,
  topCardIndex: i,
  totalCards,
  handleRotate,
  gotoNextCard,
  gotoPreviousCard,
  addNewCard,
  removeCard,
}) => {
  const cs = useStyles();

  return (
    <Grid container className={cs.buttonsContainer}>
      <Grid item xs={4} sm={5} className={cs.gridItem}>
        <div className={cs.buttonWrapper}>
          <ResponsiveButton fullWidth startIcon="prev" colour="green" onClick={gotoPreviousCard}>
            Previous
          </ResponsiveButton>
        </div>
      </Grid>
      <Grid item xs={4} sm={2} className={cs.rotateButtonContainer}>
        <div className={cs.rotateButtonWrapper}>
          <CircleButton
            size="medium"
            className={cs.rotateButton}
            iconName="rotate"
            colour="cyan"
            onClick={handleRotate}
          />
        </div>
      </Grid>
      <Grid item xs={4} sm={5} className={cs.gridItem}>
        <div className={cs.buttonWrapper}>
          <ResponsiveButton fullWidth endIcon="next" colour="green" onClick={gotoNextCard}>
            Next
          </ResponsiveButton>
        </div>
      </Grid>

      {creatingDeck && (
        <>
          <Grid item xs={6} className={cs.gridItem}>
            <div className={cs.buttonWrapper}>
              <ResponsiveButton
                fullWidth
                startIcon="bin"
                colour="red"
                disabled={totalCards < 4}
                onClick={removeCard}
              >
                Remove
              </ResponsiveButton>
            </div>
          </Grid>
          <Grid item xs={6} className={cs.gridItem}>
            <div className={cs.buttonWrapper}>
              <ResponsiveButton
                fullWidth
                endIcon="add"
                colour="blue"
                disabled={i >= 11}
                onClick={addNewCard}
              >
                Add Card
              </ResponsiveButton>
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
};
