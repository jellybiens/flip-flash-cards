import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CircleButton } from '../../atoms/Buttons';

type ArrayNavigationButtons = {
  topCardIndex: number;
  totalCards: number;
  handleRotate: () => void;
  gotoNextCard: () => void;
  gotoPreviousCard: () => void;
  addNewCard: () => void;
};

export const NavigationButtons: React.FC<ArrayNavigationButtons> = ({
  topCardIndex: i,
  totalCards,
  handleRotate,
  gotoNextCard,
  gotoPreviousCard,
  addNewCard,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <CircleButton iconName="rotate" colour="cyan" onClick={handleRotate} />
      </Grid>
      <Grid item xs={3}>
        {i > 0 && <CircleButton iconName="prev" colour="green" onClick={gotoPreviousCard} />}
      </Grid>
      <Grid item xs={3}>
        <Typography>{`Card #${i + 1} of ${totalCards}`}</Typography>
      </Grid>
      <Grid item xs={3}>
        {i < totalCards - 1 ? ( // Next Button
          <CircleButton iconName="next" colour="green" onClick={gotoNextCard} />
        ) : i < 11 ? ( // Add Button
          <CircleButton
            iconName="add"
            colour="blue"
            onClick={() => {
              addNewCard();
              gotoNextCard();
            }}
          />
        ) : (
          // Add Button Disabled
          // TODO: disabled colours
          <CircleButton iconName="add" colour="blue" disabled />
        )}
      </Grid>
    </>
  );
};
