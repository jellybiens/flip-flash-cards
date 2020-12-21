import * as React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { FlipCardFieldValues } from '@types';
import { FieldArray, useFormikContext } from 'formik';
import { TextField } from '../TextField';
import { LessonDeckTransitions } from '../../transitions/LessonDeckTransitions';
import { DoubleCardFaceInput } from './DoubleCardFaceInput';
import { NavigationButtons } from './NavigationButtons';
import { FlipCardSizing } from '../../definitions';
import { CircleButton } from '../../atoms/Buttons';

const useStyles = makeStyles((theme: Theme) => {
  return {
    deckContainer: { position: 'relative', ...FlipCardSizing(theme) },
  };
});

export const CardFaceInputArray: React.FC = () => {
  const cs = useStyles();
  const [rotate, setRotate] = React.useState<boolean[]>([]);

  const [topCardIndex, setTopCardIndex] = React.useState(0);
  const {
    values: { deckCards },
  } = useFormikContext<{ deckCards: FlipCardFieldValues[] }>();
  const totalCards = deckCards.length;

  return (
    <Grid container>
      <FieldArray name="deckCards">
        {(arrayHelpers) => (
          <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
              <div className={cs.deckContainer}>
                {deckCards.map((_, i) => (
                  <LessonDeckTransitions key={i} index={i} topCardIndex={topCardIndex}>
                    <DoubleCardFaceInput index={i} rotate={rotate[i]} />
                  </LessonDeckTransitions>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <CircleButton
                iconName="rotate"
                colour="cyan"
                onClick={() => {
                  const newRotate = [...rotate];
                  newRotate[topCardIndex] = !newRotate[topCardIndex];
                  setRotate(newRotate);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correct Answer"
                name={`deckCards.${topCardIndex}.answer`}
                variant="outlined"
              />
            </Grid>
            <>
              <NavigationButtons {...{ topCardIndex, setTopCardIndex, totalCards, arrayHelpers }} />
            </>
          </Grid>
        )}
      </FieldArray>
    </Grid>
  );
};
