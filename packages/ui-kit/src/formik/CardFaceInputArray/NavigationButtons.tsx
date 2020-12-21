import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CircleButton } from '../../atoms/Buttons';
import { ArrayHelpers } from 'formik';
import { initialCardValues } from '../FormikCreateDeckWrapper';

type ArrayNavigationButtons = {
  topCardIndex: number;
  setTopCardIndex: (i: number) => void;
  totalCards: number;
  arrayHelpers: ArrayHelpers;
};

export const NavigationButtons: React.FC<ArrayNavigationButtons> = ({
  topCardIndex: i,
  setTopCardIndex,
  totalCards,
  arrayHelpers,
}) => {
  return (
    <>
      <Grid item xs={3}>
        {i > 0 && ( // Previous Button
          <CircleButton iconName="prev" colour="green" onClick={() => setTopCardIndex(i - 1)} />
        )}
      </Grid>
      <Grid item xs={3}>
        <Typography>{`Card #${i + 1} of ${totalCards}`}</Typography>
      </Grid>
      <Grid item xs={3}>
        {i < totalCards - 1 ? ( // Next Button
          <CircleButton iconName="next" colour="green" onClick={() => setTopCardIndex(i + 1)} />
        ) : i < 11 ? ( // Add Button
          <CircleButton
            iconName="add"
            colour="blue"
            onClick={() => {
              arrayHelpers.push(initialCardValues);
              setTopCardIndex(i + 1);
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
