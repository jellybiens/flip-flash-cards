import * as React from 'react';
import { Grid } from '@material-ui/core';
import { SquareButton } from '../../atoms/Buttons';

type ArrayNavigationButtons = {
  topCardIndex: number;
  totalCards: number;
  handleRotate: () => void;
  gotoNextCard: () => void;
  gotoPreviousCard: () => void;
  addNewCard: () => void;
  removeCard: () => void;
};

export const NavigationButtons: React.FC<ArrayNavigationButtons> = ({
  topCardIndex: i,
  totalCards,
  handleRotate,
  gotoNextCard,
  gotoPreviousCard,
  addNewCard,
  removeCard,
}) => {
  return (
    <>
      <Grid item xs={6}>
        <SquareButton fullWidth startIcon="prev" colour="green" onClick={gotoPreviousCard}>
          Previous Card
        </SquareButton>
      </Grid>
      <Grid item xs={6}>
        <SquareButton fullWidth startIcon="next" colour="green" onClick={gotoNextCard}>
          Next Card
        </SquareButton>
      </Grid>
      <Grid item xs={6}>
        <SquareButton
          fullWidth
          startIcon="bin"
          colour="red"
          disabled={totalCards < 4}
          onClick={removeCard}
        >
          Remove Card
        </SquareButton>
      </Grid>
      <Grid item xs={6}>
        <SquareButton
          fullWidth
          startIcon="add"
          colour="blue"
          disabled={i >= 11}
          onClick={addNewCard}
        >
          Add Another Card
        </SquareButton>
      </Grid>
      <Grid item xs={6}>
        <SquareButton fullWidth startIcon="rotate" colour="cyan" onClick={handleRotate}>
          Rotate Card
        </SquareButton>
      </Grid>
    </>
  );
};
